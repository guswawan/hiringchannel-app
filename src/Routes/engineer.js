const express = require ('express');
const controller = require ('../Controllers/engineer');
const controller_skill = require ('../Controllers/skill');
const auth = require ('../Helpers/auth');

const router = express.Router ();


router.get ('/', auth.verifyEngineer, controller.getAllEngineer); // localhost:5000/engineer/
router.get ('/profile', auth.verifyEngineer, controller.getProfilEngineer);
router.post ('/', controller.postEngineer); // localhost:5000/engineer/
router.patch ('/:id', controller.patchEngineer); // localhost:5000/engineer/:id/
router.delete ('/:id', controller.deleteEngineer); // localhost:5000/engineer/:id/

//CATATAN JADIKAN SATU ENDPOINT SKILLNYA KE ENDPOINT PROFIL. ATAU METFHODNYA JADIKAN SATU

//SKILL
router.get ('/skill', controller_skill.getSkillEngineer);
router.post ('/skill/:id', controller_skill.postSkillEngineer); // localhost:5000/engineer/skill/:id_engineer/
router.patch ('/skill/:id_engineer', controller_skill.patchSkillEngineer); // localhost:5000/engineer/skill/:id/:id/
router.delete ('/skill/:id_skill', controller_skill.deleteSkillEngineer); // localhost:5000/engineer/skill/:id_skill_item/:id_engineer/


module.exports = router;
