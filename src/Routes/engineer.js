const express = require ('express');
const controller = require ('../Controllers/engineer');
const auth = require ('../Helpers/auth');

const router = express.Router ();


router.get ('/', auth.verifyCompany, controller.getAllEngineer); // localhost:5000/engineer/
router.get ('/id', controller.getEngineerbyId);
router.get ('/profile', auth.verifyEngineer, controller.getProfilEngineer); // localhost:5000/engineer/profile
router.get ('/skill', controller.getSkillEngineer); // localhost:5000/engineer/skill
router.post ('/', controller.postEngineer); // localhost:5000/engineer/
router.post ('/skill/:id', controller.postSkillEngineer); // localhost:5000/engineer/skill/:id_engineer/
router.patch ('/:id', controller.patchEngineer); // localhost:5000/engineer/:id/
router.patch ('/skill/:id_engineer', controller.patchSkillEngineer); // localhost:5000/engineer/skill/:id/:id/
router.delete ('/:id', controller.deleteEngineer); // localhost:5000/engineer/:id/
router.delete ('/skill/:id_skill', controller.deleteSkillEngineer); // localhost:5000/engineer/skill/:id_skill_item/:id_engineer/




module.exports = router;
