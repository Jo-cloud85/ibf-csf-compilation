DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE employee (
    emp_id CHAR(8) NOT NULL PRIMARY KEY,
    firstName VARCHAR(64) NOT NULL,
    lastName VARCHAR(64) NOT NULL,
    email VARCHAR(128) NOT NULL,
    profileURL VARCHAR(128) NOT NULL
);

-- When adding this database to Railway, comment this off as we are using Railway root user
grant all privileges on employeeDB.* to 'abcde'@'%';
flush privileges;