const {body} = require("express-validator");
const { user } = require("../data-user");

const checkValidasi = [
    body("fullName")
        .notEmpty().withMessage("wajib diisi"),
    body("email")
        .notEmpty().withMessage("wajib diisi")
        .isEmail().withMessage("format harus benar"),
    body("password")
        .notEmpty().withMessage("wajib diisi")
        .isLength({min: 8}).withMessage("minimal 8 karakter")
        .matches(/[\W_]/).withMessage("minimal 1 simbol"),
    body("dob")
        .notEmpty().withMessage("wajib diisi")
        .isDate({format: 'YYYY-MM-DD'}).withMessage("format tanggal belum benar")
]

module.exports = checkValidasi;
