FROM node:14.17.6-alpine

ARG FLYWAY_VERSION=7.3.2
ARG LANG=C.UTF-8

COPY . /app

RUN apk update --no-cache && apk add --no-cache bash

RUN bin/sh -c "cd /app && yarn install && yarn build"

COPY migration /flyway/sql

COPY run-app.sh /usr/local/bin/run-app
RUN chmod +x /usr/local/bin/run-app

CMD ["/usr/local/bin/run-app"]
