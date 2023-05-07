var express = require('express');
var router = express.Router();
const userController = require('../controllers/UserController')

/* GET users listing. */
router.get('/', userController.index);

router.get('/login', userController.login);

router.post('/register', userController.register);

module.exports = router;
