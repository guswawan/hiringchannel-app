const express = require ('express');
const controller = require ('../Controllers/company');
const auth = require ('../Helpers/auth');

const router = express.Router ();

router.get ('/', auth.verifyCompany ,controller.getAllCompany); // localhost:5000/company
router.get ('/:id', controller.getCompany); // localhost:5000/company/:id/
router.post ('/', controller.postCompany); // localhost:5000/company/
router.patch ('/:id', controller.patchCompany); // localhost:5000/company/:id
router.delete ('/:id', controller.deleteCompany); // localhost: 5000/company/:id

module.exports = router;
