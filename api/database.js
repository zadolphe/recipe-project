// handling the database connection

// connecting to mysql
const mysql = require("mysql");

// login information to database
const db = mysql.createConnection({
  user: "root",
  host: "localhost",

  // password to your local MYSQL db
  password: "",

  // the name of the schema
  database: "recipe_database",
});

// connect to the database
db.connect();

// export for use of controllers
module.exports = db;
