DROP DATABASE IF EXISTS mymedia;

CREATE DATABASE mymedia;

USE mymedia;

CREATE TABLE pictures (
    pic_id CHAR(8) NOT NULL,
    content mediumblob,
    mime VARCHAR(128),

    CONSTRAINT PRIMARY KEY (pic_id)
);

-- When adding this database to Railway, comment this off as we are using Railway root user
grant all privileges on mymedia.* to 'abcde'@'%';
flush privileges;