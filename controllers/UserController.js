const User = require('../models/user')
const { validationResult } = require('express-validator');

exports.index = async (req, res, next) => {
    const user = await User.find()
    res.status(200).json({ 
        data : user });
}

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        
        //validation
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง')
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
        }
        
        //check email ซ้ำ
        const exitEmail = await User.findOne({ email:email })
        if (exitEmail) {
            const error = new Error('อีเมลล์ซ้ำ มีผู้ใช้งานเลี้ยว')
            error.statusCode = 404
            throw error;
        }
        
        let user = new User()
        user.name = name
        user.email = email
        user.password = await user.encryptPassword(password);
        await user.save()
        res.status(201).json({ message : "ลงทะเบียนเรียบร้อย" });
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        //check ว่ามีอีเมลล์นี้ในระบบหรือไม่
        const user = await User.findOne({ email:email })
        if (!user) {
            const error = new Error('ไม่พบผู้ใช้งานนี้ในระบบ')
            error.statusCode = 404
            throw error;
        }

        //ตรวจสอบ password ว่าตรงหรือไม่ถ้าไม่ตรง (false) ให้โยน error ออกไป
        const isValid = await user.checkPassword(password)
        if (!isValid) {
            const error = new Error('รหัสผ่านไม่ถูกต้อง')
            error.statusCode = 401
            throw error;
        }

        res.status(200).json({ 
            message : "ล็อกอินเรียบร้อย"
        });
    } catch (error) {
        next(error)
    }
}