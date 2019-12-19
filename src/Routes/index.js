const express = require ('express');
const company = require ('./company');
const engineer = require ('./engineer');
const user = require ('./user');
const welcome = require ('./welcome');

const router = express.Router ();


router.use ('/company', company); // localhost:5000/company
router.use ('/engineer', engineer); // localhost:5000/engineer
router.use ('/user', user); // localhost:5000/user
router.use ('/welcome', welcome); // localhost:5000/welcome

module.exports = router;
