DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    email VARCHAR(64) NOT NULL UNIQUE,
    profile_url VARCHAR(128)
);

-- When adding this database to Railway, comment this off as we are using Railway root user
grant all privileges on employeeDB.* to 'abcde'@'%';
flush privileges;