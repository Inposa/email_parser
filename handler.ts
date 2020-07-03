const serverless = require("serverless-http");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const utils = require("./utils");
const {verifToken} = require("./tokenVerification")
const { anabaToken } = require("./config.json");

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

  const token = req.body.token;
  const email = req.body.email;

  // Stop request if invalid token is provided
  if (
    process.env.ENV !== "local" &&
    !verifToken(token, JSON.stringify(anabaToken))
  ) {
    res.status(403).send("Forbidden: invalid token");
  }

  const fullname = req.body.name;
  const names = utils.parseNames(fullname);

  const bodyString = req.body.emailBody;
  
  const info = utils.emailStringParser(bodyString, email);
  const role = utils.findContactRole(bodyString, fullname);

  const response = { ...info, ...names, ...role };

  // Return result
  res.send(response);
});

module.exports.handler = serverless(app);
