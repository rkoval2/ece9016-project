createdb ece9016_project --locale=en_US.UTF-8 --encoding=UTF8 --template=template0

psql -U postgres -h localhost -d ece9016_project -c 'CREATE TABLE employees
(
    "id"         SERIAL PRIMARY KEY,
    "name"       TEXT        NOT NULL,
    "position"   TEXT        NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()::TIMESTAMPTZ
)'
