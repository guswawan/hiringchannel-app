const express = require ('express');
const controller = require ('../Controllers/project');
const auth = require ('../Helpers/auth');

const router = express.Router ();


router.get ('/', /*auth.verifyEngineer,*/ controller.getAllProject); // localhost:5000/v1/engineer/
// router.get ('/:id_project', controller.getProjectbyId);
router.post ('/', /*auth.verifyEngineer,*/ controller.postProject); // localhost:5000/engineer/
router.patch ('/:id_project', controller.patchProject); // localhost:5000/engineer/:id/
// router.delete ('/:id', controller.deleteProject); // localhost:5000/engineer/:id/





module.exports = router;
