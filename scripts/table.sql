# user table
CREATE TABLE `mydb`.`user` (
    `user_idx` int NOT NULL AUTO_INCREMENT,
    `user_id` varchar(45) DEFAULT NULL,
    `user_name` varchar(45) DEFAULT NULL,
    `user_pwd` varchar(45) DEFAULT NULL,
    `salt` varchar(45) DEFAULT NULL,
    `address` varchar(200) DEFAULT NULL,
    PRIMARY KEY (`user_idx`)
  ) 
  

CREATE TABLE `mydb`.`user_img` (
  `user_img_idx` int NOT NULL AUTO_INCREMENT,
  `user_idx` int NOT NULL,
  `img_path` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`user_img_idx`)
)

CREATE TABLE `mydb`.`deliv_info` (
  `deliv_info_idx` int NOT NULL AUTO_INCREMENT,
  `user_idx` int NOT NULL,
  `base_address` varchar(45) DEFAULT NULL,
  `detail_address` varchar(45) DEFAULT NULL,
  `zipcode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`deliv_info_idx`)
)

CREATE TABLE `mydb`.`banner` (
  `banner_idx` int NOT NULL AUTO_INCREMENT,
  `img_path` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`banner_idx`)
)
CREATE TABLE `mydb`.`brand` (
  `brand_idx` int NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`brand_idx`)
)
CREATE TABLE `mydb`.`cart` (
  `cart_idx` int NOT NULL AUTO_INCREMENT,
  `user_idx` int NOT NULL,
  `goods_idx` int NOT NULL,
  `qty` int DEFAULT NULL,
  PRIMARY KEY (`cart_idx`)
) 
CREATE TABLE `mydb`.`category` (
  `category_idx` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`category_idx`)
)
CREATE TABLE `mydb`.`goods_img` (
  `goods_img_idx` int NOT NULL AUTO_INCREMENT,
  `goods_idx` int NOT NULL,
  `img_path` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`goods_img_idx`)
) 
CREATE TABLE `mydb`.`goods` (
  `goods_idx` int NOT NULL AUTO_INCREMENT,
  `goods_name` varchar(45) DEFAULT NULL,
  `goods_price` int DEFAULT NULL,
  `brand_idx` int DEFAULT NULL,
  `category_idx` int DEFAULT NULL,
  PRIMARY KEY (`goods_idx`)
) 
CREATE TABLE `mydb`.`orders` (
  `orders_idx` int NOT NULL AUTO_INCREMENT,
  `user_idx` int NOT NULL,
  `goods_idx` int NOT NULL,
  `qty` int DEFAULT NULL,
  `order_date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`orders_idx`)
) 
CREATE TABLE `mydb`.`payment` (
  `payment_idx` int NOT NULL AUTO_INCREMENT,
  `payment_way` varchar(45) DEFAULT NULL,
  `amount` varchar(45) DEFAULT NULL,
  `orders_idx` int NOT NULL,
  `payment_date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`payment_idx`)
) 
CREATE TABLE `mydb`.`review` (
  `review_idx` int NOT NULL AUTO_INCREMENT,
  `goods_idx` int DEFAULT NULL,
  `user_idx` int DEFAULT NULL,
  `content` varchar(45) DEFAULT NULL,
  `star` int DEFAULT NULL,
  PRIMARY KEY (`review_idx`)
)