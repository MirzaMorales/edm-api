USE BD_mnml;

CREATE TABLE user(
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    lastname VARCHAR(400)
)

CREATE TABLE task(
    id Serial PRIMARY KEY,
    name VARCHAR(150) ,
    description VARCHAR(500) ,
    priority TINYINT(1),
    user_id INTEGER REFERENCES user(id)
)

//! npm i pg
//! npm i @types/pg -D

-- For the users table
INSERT INTO users (name, lastname) 
VALUES ('Mirza', 'Morales');

-- For the tasks table
INSERT INTO tasks (name, description, priority, user_id) 
VALUES ('Task Mirza', 'Description of task Mirza', true, 1);
INSERT INTO tasks (name, description, priority, user_id) 
VALUES ('Task Cati', 'Description of task Cati', true, 1);