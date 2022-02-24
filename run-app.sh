#!/usr/bin/env bash

echo "Running run-app.sh"

set -e

host=${TYPEORM_HOST}
database=${TYPEORM_DATABASE}
user=${TYPEORM_USERNAME}
password=${TYPEORM_PASSWORD}
locations=/flyway/sql

flyway --version
flyway -url=jdbc:mysql://$host -schemas=$database -user=$user -password=$password -locations=$locations -connectRetries=60 repair

cd /app
node dist/index.js
