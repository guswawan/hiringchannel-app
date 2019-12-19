const express = require ('express');
const auth = require ('../Helpers/auth');
const controller = require ('../Controllers/user');

const router = express.Router ();


router.post ('/login', controller.login); // localhost:5000/v1/login/
router.get ('/', controller.getAllUser); // localhost:5000/v1/user
router.get ('/:id', controller.getUser); // localhost:5000/v1/user/:id/
router.post ('/', controller.postUser); // localhost:5000/v1/user/

router.patch ('/:id', controller.patchUser); // localhost:5000/user/:id
router.delete ('/:id', controller.deleteUser); // localhost: 5000/user/:id

module.exports = router;
