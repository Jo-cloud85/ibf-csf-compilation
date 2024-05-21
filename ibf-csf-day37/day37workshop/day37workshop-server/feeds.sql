DROP DATABASE IF EXISTS feeds;

CREATE DATABASE feeds;

USE feeds;

CREATE TABLE posts (
  post_id varchar(8) NOT NULL,
  comments mediumtext,
  picture mediumblob,
  
  PRIMARY KEY (post_id)
);

-- When adding this database to Railway, comment this off as we are using Railway root user
grant all privileges on feeds.* to 'abcde'@'%';
flush privileges;