ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pw123';
#run the above command to recheck pw problem if any
use hotel_react;
CREATE DATABASE hotel_react /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
use hotel_react;

CREATE TABLE booking (
  id int NOT NULL AUTO_INCREMENT,
  no_of_days int NOT NULL,
  no_of_rooms int NOT NULL,
  cust_id int NOT NULL,
  hotel_id int NOT NULL,
  PRIMARY KEY (id),
  KEY hotel_id_idx (hotel_id),
  KEY cust_id_idx (cust_id),
  CONSTRAINT cust_id FOREIGN KEY (cust_id) REFERENCES users (u_id) ON DELETE CASCADE,
  CONSTRAINT hotel_id FOREIGN KEY (hotel_id) REFERENCES hotels (id) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE hotels (
  id int NOT NULL AUTO_INCREMENT,
  hotel_name varchar(45) NOT NULL,
  hotel_cost_per_day int NOT NULL,
  hotel_address varchar(255) NOT NULL,
  hotel_phone_number bigint NOT NULL,
  hote_rooms_ava int NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE users (
  u_id int NOT NULL AUTO_INCREMENT,
  email varchar(45) NOT NULL,
  password varchar(45) NOT NULL,
  isAdmin tinyint DEFAULT '0',
  PRIMARY KEY (u_id)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE vechicles (
  id int NOT NULL AUTO_INCREMENT,
  v_name varchar(45) NOT NULL,
  v_type varchar(45) NOT NULL,
  v_cost int NOT NULL,
  h_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY h_id_idx (h_id),
  CONSTRAINT h_id FOREIGN KEY (h_id) REFERENCES hotels (id) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#put this in triggers of hotels,byRight click on booking table,And click alter table,Then in bottom there is trigger,Click on after update,And add the code there,And apply.

CREATE DEFINER=root@localhost TRIGGER update_rooms_ava AFTER INSERT ON booking FOR EACH ROW BEGIN
    UPDATE hotels
    SET hote_rooms_ava = hote_rooms_ava - NEW.no_of_rooms
    WHERE id = NEW.hotel_id;
END

