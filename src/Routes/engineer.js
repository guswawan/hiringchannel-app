const express = require ('express');
const controller = require ('../Controllers/engineer');

const router = express.Router ();

router.get ('/', controller.getAllEngineer); // localhost:5000/engineer
router.post ('/', controller.postEngineer); // localhost:5000/engineer/
router.patch ('/:id', controller.patchEngineer); // localhost:5000/engineer/:id
router.delete ('/:id', controller.deleteEngineer); // localhost:5000/engineer/:id

module.exports = router;
