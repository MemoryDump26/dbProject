DROP DATABASE IF EXISTS project;
CREATE DATABASE project;
USE project;

DROP TABLE IF EXISTS customers;
CREATE TABLE IF NOT EXISTS customers (
    userName VARCHAR(30) PRIMARY KEY,
    customerName VARCHAR(50),
    phone VARCHAR(20),
    address VARCHAR(50),
    city VARCHAR(50),
    country VARCHAR(50),
    password TEXT NOT NULL,
    email TEXT NOT NULL
);

DROP TABLE IF EXISTS orders;
CREATE TABLE IF NOT EXISTS orders (
    orderID INT AUTO_INCREMENT PRIMARY KEY,
    orderDate DATE,
    requiredDate DATE,
    shippedDate DATE,
    status VARCHAR(20),
    comment VARCHAR(100),
    userName VARCHAR(30) NOT NULL,
    FOREIGN KEY(userName) REFERENCES customers(userName)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

DROP TABLE IF EXISTS productdata;
CREATE TABLE IF NOT EXISTS productdata (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    productImageURL TEXT,
    productDesc TEXT,
    price DECIMAL(10, 2)
);

DROP TABLE IF EXISTS orderdetails;
CREATE TABLE IF NOT EXISTS orderdetails (
    orderID INT,
    productID INT,
    quantityOrdered INT,
    priceEach DECIMAL(10, 2),
    PRIMARY KEY (orderID, productID),
    FOREIGN KEY(orderID) REFERENCES orders(orderID)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY(productID) REFERENCES productdata(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

