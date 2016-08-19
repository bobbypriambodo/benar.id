#!/usr/bin/env bash

# Enable getting $MYSQL_HOSTNAME variable
source .env

./bin/wait-for-it.sh $MYSQL_HOSTNAME:3306 --strict -t 100 -- npm run create-db -s

# Pass the exit code to docker-compose
exit $?
