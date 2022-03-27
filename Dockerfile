FROM node:14.17.6-alpine

ARG FLYWAY_VERSION=7.3.2
ARG LANG=C.UTF-8

COPY . /app

RUN apk update --no-cache && apk add --no-cache bash

RUN bin/sh -c "cd /app && yarn install && yarn build"

# @see https://github.com/flyway/flyway/issues/2510
RUN \
  # Install glibc and set C.UTF-8 locale as default.
  # @see https://github.com/flyway/flyway/issues/2510
  # @see https://hub.docker.com/r/frolvlad/alpine-glibc/dockerfile
  ALPINE_GLIBC_BASE_URL="https://github.com/sgerrand/alpine-pkg-glibc/releases/download" && \
  ALPINE_GLIBC_PACKAGE_VERSION="2.32-r0" && \
  ALPINE_GLIBC_BASE_PACKAGE_FILENAME="glibc-$ALPINE_GLIBC_PACKAGE_VERSION.apk" && \
  ALPINE_GLIBC_BIN_PACKAGE_FILENAME="glibc-bin-$ALPINE_GLIBC_PACKAGE_VERSION.apk" && \
  ALPINE_GLIBC_I18N_PACKAGE_FILENAME="glibc-i18n-$ALPINE_GLIBC_PACKAGE_VERSION.apk" && \
  apk add --no-cache --virtual=.build-dependencies wget ca-certificates && \
  wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
  wget -q \
  "$ALPINE_GLIBC_BASE_URL/$ALPINE_GLIBC_PACKAGE_VERSION/$ALPINE_GLIBC_BASE_PACKAGE_FILENAME" \
  "$ALPINE_GLIBC_BASE_URL/$ALPINE_GLIBC_PACKAGE_VERSION/$ALPINE_GLIBC_BIN_PACKAGE_FILENAME" \
  "$ALPINE_GLIBC_BASE_URL/$ALPINE_GLIBC_PACKAGE_VERSION/$ALPINE_GLIBC_I18N_PACKAGE_FILENAME" && \
  apk add --no-cache \
  "$ALPINE_GLIBC_BASE_PACKAGE_FILENAME" \
  "$ALPINE_GLIBC_BIN_PACKAGE_FILENAME" \
  "$ALPINE_GLIBC_I18N_PACKAGE_FILENAME" && \
  /usr/glibc-compat/bin/localedef --force --inputfile POSIX --charmap UTF-8 "$LANG" || true && \
  echo "export LANG=$LANG" > /etc/profile.d/locale.sh && \
  apk del glibc-i18n && \
  apk del .build-dependencies && \
  rm \
  "$ALPINE_GLIBC_BASE_PACKAGE_FILENAME" \
  "$ALPINE_GLIBC_BIN_PACKAGE_FILENAME" \
  "$ALPINE_GLIBC_I18N_PACKAGE_FILENAME" && \
  # Fix zlib
  # @see https://github.com/sgerrand/alpine-pkg-glibc/issues/75#issuecomment-404166713
  wget -q "https://www.archlinux.org/packages/core/x86_64/zlib/download" -O /tmp/libz.tar.xz && \
  mkdir -p /tmp/libz && \
  tar -xf /tmp/libz.tar.xz -C /tmp/libz && \
  cp /tmp/libz/usr/lib/libz.so.1.2.11 /usr/glibc-compat/lib && \
  /usr/glibc-compat/sbin/ldconfig && \
  rm -rf /tmp/libz /tmp/libz.tar.xz && \
  # Install Flyway
  mkdir /opt/flyway && \
  wget -q -O - https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/${FLYWAY_VERSION}/flyway-commandline-${FLYWAY_VERSION}-linux-x64.tar.gz | tar -xzf - -C /opt/flyway --strip-components 1 && \
  ls -lah /opt/flyway && \
  ln -s /opt/flyway/flyway /usr/local/bin

COPY migration /flyway/sql

COPY run-app.sh /usr/local/bin/run-app
RUN chmod +x /usr/local/bin/run-app

CMD ["/usr/local/bin/run-app"]
