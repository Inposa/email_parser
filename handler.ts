const serverless = require("serverless-http");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const utils = require("./utils");
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

  // Stop request if invalid token is provided
  if (
    process.env.ENV !== "local" &&
    !utils.verifToken(token, JSON.stringify(anabaToken))
  ) {
    res.status(403).send("Forbidden: invalid token");
  }

  const fullname = req.body.name;
  const names = utils.parseNames(fullname);
  
  const bodyString = req.body.emailBody;
  console.log("PAR ICI, IL FAUT REGARDER LAAAAAAAAAAAAAAAAAAAAAAAA\n",bodyString) //À supprimer
  // Use regex to find what we want
  const info = utils.emailStringParser(bodyString);
  console.log("PAR ICI, IL FAUT REGARDER LAAAAAAAAAAAAAAAAAAAAAAAA\n",info)       //À supprimer
  const response = { ...info, ...names };

  // Return result
  //res.send(response);
  res.send(response);
});

module.exports.handler = serverless(app);
