const express = require ('express');
const company = require ('./company');
const engineer = require ('./engineer');
const project = require ('./project');
const user = require ('./user');
const homepage = require ('./homepage');

const router = express.Router ();


router.use ('/company', company); // localhost:5000/company
router.use ('/engineer', engineer); // localhost:5000/engineer
router.use ('/project', project); // localhost:5000/project
router.use ('/user', user); // localhost:5000/user
router.use ('/homepage', homepage); // localhost:5000/homepage

module.exports = router;
