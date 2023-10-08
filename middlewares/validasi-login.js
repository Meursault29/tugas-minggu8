const {body} = require("express-validator");

const validasiLogin = [
    body("email")
    .notEmpty().withMessage("wajib diisi")
    .isEmail().withMessage("format harus benar"),
body("password")
    .notEmpty().withMessage("wajib diisi")
    .isLength({min: 8}).withMessage("minimal 8 karakter")
    .matches(/[\W_]/).withMessage("minimal 1 simbol")
]

module.exports = validasiLogin;