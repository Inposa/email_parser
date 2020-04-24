const serverless = require("serverless-http");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const utils = require("./utils");
const {anabaToken} = require("./config.json");

/**
 * This function get an email body in params, and return a json object like this :
 * {
 *  phone: XXX,
 *  mobile: XXX,
 *  website: XXX
 * }
 */
app.post("/parse", function (req, res) {
  // Get params
  const queryMessage = req.body.emailBody;
  const bodyString = JSON.stringify(queryMessage);

  const token = req.body.token;
  const tokenString = JSON.stringify(token);

  // Stop request if invalid token is provided
  if (!utils.verifToken(tokenString, JSON.stringify(anabaToken))) {
    res.status(403).send("Forbidden: invalid token");
  }

  // Use regex to find what we want
  const response = utils.emailStringParser(bodyString);

  // Return result
  //res.send(response);
  res.send(response)
});

module.exports.handler = serverless(app);
