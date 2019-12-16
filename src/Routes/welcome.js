const express = require ('express');
const controller = require ('../Controllers/welcome');

const Router = express.Router ();

Router.get ('/', controller.getWelcome);

module.exports = Router;
