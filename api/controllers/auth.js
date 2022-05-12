// getting the database connection
const connection = require("../database.js");

// for accessing hash functions
var crypto = require("crypto");

// function for sanitizing sql inputs
function sanitizeInput(str) {
  for (i = 0; i < str.length; i++) {
    if (str[i] == "-" || str[i] == ";") {
      const newStr =
        str.substring(0, i) + "—" + str.substring(i + 1, str.length);
      //&#8212 for em (long) dash
      //console.log(newStr);
      return sanitizeInput(newStr);
    }
    if (str[i] == '"' || str[i] == "'") {
      const newStr =
        str.substring(0, i) + "*" + str.substring(i + 1, str.length);
      //can change above to whatever other character
      //console.log(newStr);
      return sanitizeInput(newStr);
    }
    if (str[i] == "=") {
      const newStr =
        str.substring(0, i) + " be " + str.substring(i + 1, str.length);
      //&#61, or &equals;
      //console.log(newStr);
      return sanitizeInput(newStr);
    }
  }

  for (i = 0; i < str.length - 5; i++) {
    const checking = str.substring(i, i + 5);
    //console.log(checking);
    if (checking.length > 4) {
      if (
        (checking[0] == "u" || checking[0] == "U") &&
        (checking[1] == "n" || checking[1] == "N") &&
        (checking[2] == "i" || checking[2] == "I") &&
        (checking[3] == "o" || checking[3] == "O") &&
        (checking[4] == "n" || checking[4] == "N")
      ) {
        // UNION!!! Boo...
        const newStr =
          str.substring(0, i) + "o" + str.substring(i + 1, str.length);
        //console.log(newStr);
        return sanitizeInput(newStr);
      }
    }
    //console.log(checking);
  }
  return str;
}

// check unique username, if unique then make a new user with the password hashed
const newUser = (req, res) => {
  for (const property in req.params) {
    console.log(`${property}: ${req.params[property]}`);
    req.params[property] = sanitizeInput(req.params[property]);
    console.log(`${property}: ${req.params[property]}`);
  }

  for (const property in req.body) {
    console.log(`${property}: ${req.body[property]}`);
    req.body[property] = sanitizeInput(req.body[property]);
    console.log(`${property}: ${req.body[property]}`);
  }

  const { username, password, address } = req.body;

  var isUnique = true;

  // Making sure the username is unique
  connection.query("SELECT username FROM user;", (err, result) => {
    // how to get rif of 'rowpacketdata' wrapper
    var usernames = JSON.parse(JSON.stringify(result));

    // check if unique username
    for (var i = 0; i < usernames.length; i++) {
      var checkUser = usernames[i].username;

      // check if username is unique
      if (username == checkUser) {
        isUnique = false;
      }
    }
    if (err) {
      res.status(400).json(err);
    } else if (isUnique == false) {
      res.status(400).json("username taken");
    } else {
      // creating the new user

      const hashedpw = crypto
        .createHash("sha256")
        .update(password)
        .digest("base64");

      var user =
        "INSERT INTO user (username, password, address) VALUES (?, ?, ?)";

      connection.query(user, [username, hashedpw, address], (err, result) => {
        if (err) {
          res.status(400).json(err);
        }
        res.status(400).json(result);
      });
    }
  });
};

// authenticate the user with the username and password they give
const authUser = (req, res) => {
  for (const property in req.params) {
    console.log(`${property}: ${req.params[property]}`);
    req.params[property] = sanitizeInput(req.params[property]);
    console.log(`${property}: ${req.params[property]}`);
  }

  for (const property in req.body) {
    console.log(`${property}: ${req.body[property]}`);
    req.body[property] = sanitizeInput(req.body[property]);
    console.log(`${property}: ${req.body[property]}`);
  }

  const { username, password } = req.body;

  // hash the password given for reference later
  const hashedGiven = crypto
    .createHash("sha256")
    .update(password)
    .digest("base64");

  connection.query(
    "SELECT password FROM user WHERE username = ?;",
    [username],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      }

      if (result.length == 0) {
        res.status(400).json("Invalid username");
      } else {
        var jsonPW = JSON.parse(JSON.stringify(result));
        var hashedFound = jsonPW[0].password;

        if (hashedGiven != hashedFound) {
          res.status(404).json("Invalid Password");
        } else {
          res.status(200).json("login successful");
        }
      }
    }
  );
};

// authenticate the user with the username and password they give
const getId = (req, res) => {
  const username = req.params.username;

  connection.query(
    "SELECT idUser FROM user WHERE username = ?;",
    [username],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(result);
    }
  );
};

module.exports = { newUser, authUser, getId };
