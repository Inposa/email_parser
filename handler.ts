const serverless = require("serverless-http");
const express = require("express");
const app = express();

/**
 * This function get an email body in params, and return a json object like this :
 * {
 *  phone: XXX,
 *  mobile: XXX,
 *  website: XXX
 * }
 */
app.get("/parse", function (req, res) {
  // Get params

  // Use regex to find what we want

  // Return result

  res.send("Hello World!");
});

module.exports.handler = serverless(app);
