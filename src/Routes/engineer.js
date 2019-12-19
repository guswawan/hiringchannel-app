const express = require ('express');
const controller = require ('../Controllers/engineer');
const controller_skill = require ('../Controllers/skill');
const controller_showcase = require ('../Controllers/showcase');

const router = express.Router ();

router.get ('/', controller.getAllEngineer); // localhost:5000/engineer/
router.get ('/:id', controller.getEngineer); // localhost:5000/engineer/:id/
router.post ('/', controller.postEngineer); // localhost:5000/engineer/
router.patch ('/:id', controller.patchEngineer); // localhost:5000/engineer/:id/
router.delete ('/:id', controller.deleteEngineer); // localhost:5000/engineer/:id/

router.get ('/search', controller.findEngineer); // localhost:5000/engineer/search/
// router.get ('/sort', controller.sortEngineer); // localhost:5000/engineer/sort/
router.get ('/pages', controller.pagesEngineer); // localhost:5000/engineer/pages/

//SKILL
router.post ('/skill/:id', controller_skill.postSkillEngineer); // localhost:5000/engineer/skill/:id_engineer/
router.patch ('/skill/:id_skill/:id_engineer', controller_skill.patchSkillEngineer); // localhost:5000/engineer/skill/:id/:id/
router.delete ('/skill/:id_skill/:id_engineer', controller_skill.deleteSkillEngineer); // localhost:5000/engineer/skill/:id_skill_item/:id_engineer/

//SHOWCASE
router.post ('/showcase/:id', controller_showcase.postShowcaseEngineer); // localhost:5000/engineer/showcase/:id_engineer/
router.patch ('/showcase/:id_showcase/:id_engineer', controller_showcase.patchShowcaseEngineer); // localhost:5000/engineer/showcase/:id_skill_item/:id_engineer/
router.delete ('/showcase/:id_showcase/:id_engineer', controller_showcase.deleteShowcaseEngineer); // localhost:5000/engineer/showcase/:id_showcase_item/:id_engineer/

module.exports = router;
