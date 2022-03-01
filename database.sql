-- commends
-- \l \c \dt
-- SELECT *
CREATE DATABASE medical_procedures;

CREATE TABLE procedures(
    procedure_id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    price decimal,
    hospital_name VARCHAR(30),
    hospital_city VARCHAR(30),
    hospital_state VARCHAR(30),
    hospital_rating decimal,
    heal_time decimal,
    contributor_id integer
);

--create data INSERT
INSERT INTO procedures (name, price, hospital_name, hospital_city, hospital_state, hospital_rating, heal_time, contributor_id ) VALUES ('Broken bone', 3500, 'Carney', 'Boston', 'Ma', 7.8, 46, 1)


--alter table
ALTER TABLE procedures
ADD  healTime decimal;

ALTER TABLE users
ADD auth_count integer;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255),
    password VARCHAR(255),
    auth_count integer,
    UNIQUE(user_name)
);

INSERT INTO users (user_name,password) VALUES ('domCharm','test', 0);



