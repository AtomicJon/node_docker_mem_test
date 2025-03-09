CREATE USER admin WITH ENCRYPTED PASSWORD 'password' CREATEDB;
CREATE DATABASE app OWNER admin;
-- NOTE: DB user needs to be a superuser to create extensions (pgvector)
-- Can be changed after the extension is created during the first migration with `ALTER ROLE superb_admin NOSUPERUSER;`
ALTER ROLE admin SUPERUSER;
