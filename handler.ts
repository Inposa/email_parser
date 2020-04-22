const serverless = require("serverless-http");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * This function get an email body in params, and return a json object like this :
 * {
 *  phone: XXX,
 *  mobile: XXX,
 *  website: XXX
 * }
 */
app.post("/parse", function (req, res) {
  const anabaToken = req.body.token;
  

  // Get params
  const queryMessage = req.body.emailBody;
  const bodyString = JSON.stringify(queryMessage);

  // Use regex to find what we want
  const phoneNumbers = bodyString.match(
    /((0|\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9]))[1-9]([- .]?[0-9]{2}){4})/g
  );
  const websites = bodyString.match(
    /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g
  );

  // Return result
  res.send({
    phones: phoneNumbers,
    websites: websites,
  });
});
module.exports.handler = serverless(app);
