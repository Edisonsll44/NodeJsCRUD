const express = require("express");

function jsonHandler(app) {
  app.use(express.json());
}

module.exports = jsonHandler;
