const express = require ('express');
const controller = require ('../Controllers/homepage');

const Router = express.Router ();

Router.get ('/', controller.getWelcome);

module.exports = Router;
