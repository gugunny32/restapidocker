const express = require('express');
const { body } = require('express-validator')
const router = express.Router();
const userController = require('../controllers/UserController')

/* GET users listing. */
router.get('/', userController.index);

router.post('/register', [
    body('name').not().isEmpty().withMessage('กรุณาป้อนชื่อสกุลด้วย'),
    body('email').not().isEmpty().withMessage('กรุณากรอกอีเมลล์ด้วย').isEmail().withMessage('รูปแบบอีเมลล์ไม่ถูกต้อง'),
    body('password').not().isEmpty().withMessage('กรุณากรอกรหัสผ่านด้วย').isLength({ min:3 }).withMessage('รหัสผ่านต้อง 3 ตัวขึ้นไป')
], userController.register);

router.post('/login', userController.login);

module.exports = router;
