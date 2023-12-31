#!/bin/bash

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

echo "Applying migrations..."
python manage.py makemigrations
python manage.py migrate
python manage.py loaddata prompt_data.json

exec "$@"