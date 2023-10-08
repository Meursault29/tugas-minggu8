const {param} = require("express-validator");

const validasiUser = [
    param("userId")
        .isNumeric().withMessage("id harus angka")
]

module.exports = validasiUser;