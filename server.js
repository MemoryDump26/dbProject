const mysql = require('mysql');
const sqlCred = require('./sqlCred');
const express = require('express');
const app = express();
const port = 3001

// Database setup.
const db = mysql.createConnection(
  sqlCred.value
);

const errorJSON = {
  error: true,
}

db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

// Express CORS (wth is this ????).
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getCustomers = function (req, res) {
  let sql = "SELECT * FROM customers;";
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err.code);
    }
    else res.json(results);
  });
}

const resolveQuery = function (req, res) {
  let sql = req.body.query;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err.code + ": " + sql);
      res.json(errorJSON);
    }
    else res.json(results);
  });
}

const addCustomer = function (req, res) {
  let sql = req.body.query;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err.code + ": " + sql);
    }
    else res.json(results);
  });
}

// Express routing.
app.get("/customers", getCustomers);

app.post("/query", resolveQuery);
app.post("/addCustomer", addCustomer);

app.get("/", (req, res) => {
  res.json(["teri teri"]);
  console.log("WHO'S TOUCHING DA CHILDE");
});

app.listen(port);
