const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const {user, SECRET_KEY } = require("../data-user")
const {body, validationResult} = require('express-validator');
const checkValidasi = require("../middlewares/validasi-register");
const validasiLogin = require("../middlewares/validasi-login");
const checkError = require("../middlewares/error-handler");


router.post('/register', checkValidasi, (req,res) =>{
    const body = req.body;
    const password = req.body.password;

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    validationResult(req).throw();
    console.log(body);

    const newUser = {
        id: user.length + 1,
        ...req.body,
        password: hashPassword,
    };

    user.push({ ...newUser });
    return res.status(201).json({ 
        message: "success"
    });
})

router.post("/login", validasiLogin, (req,res) => {
    const { email, password } = req.body;
    const checkUser = user.find((item) => item.email === email);
    const savedPassword = checkUser.password;
    const isMatch = bcrypt.compareSync(password, savedPassword);

    const token = jwt.sign({ id: checkUser.id, email: checkUser.email}, SECRET_KEY);

    validationResult(req).throw();

    if(!checkUser || !isMatch){
        return res.status(401).json({
            message: "Login Failed"
        })
    }
    
    console.log(checkUser)
    console.log(token)
    return res.status(200).json({
        message: "Success",
        data: {token}
    });
})
router.use(checkError)
module.exports = router;
