var express = require("express");
var mysql = require("mysql2");
var bodyParser = require("body-parser");
var cors = require("cors");
var jwt = require("jsonwebtoken");

const key = "qazwsxedcrfvtgbyhnujmikolp";

var app = express();
app.use(cors());
app.use(bodyParser.json());

let host = "45.13.252.1";
let user = "u323720655_danrino";
let database = "u323720655_danrino";
let password = "!n+erN12";

var connection = mysql.createConnection({
  host: host,
  user: user,
  database: database,
  password: password,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("=========================");
    console.log("=====connection successfull");
    console.log("=====host = " + host);
    console.log("=====user = " + user);
    console.log("=====database = " + database);
    console.log("=========================");
  }
});

app.get("/select", (req, res) => {
  let sql = "select * from users";
  connection.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.post("/insert", (req, res) => {
  let i = req.body;
  let sql =
    "insert into users(name , email, phone) values('" +
    i.name +
    "','" +
    i.email +
    "'," +
    i.phone +
    ")";

  connection.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log("data inserted (" + data + ")");
    }
  });
});

app.post("/jwt", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;

  if (name == "admin" && email == "admin@gmail.com") {
    var token = jwt.sign({ user: "admin" }, key);
    res.send({
      token: token,
      message: "Token Assigned",
    });
  } else {
    res.send({
      err: "Token Assign Failed",
    });
  }
});

app.get("/verifyToken", (req, res) => {
  token = req.headers.token;
  try {
    jwt.verify(token, key);
    res.send({
      message: "success",
      token: token,
    });
  } catch (error) {
    res.send({
      message: "ERROR!",
      error: error,
    });
  }
});

let port = 1206;
app.listen(port, () => {
  console.log("=========================");
  console.log("=====listening to" + port);
  console.log("=========================");
});
