const express = require("express");
const router = express.Router();
const { user } = require("../data-user");
const {param, validationResult} = require('express-validator');
const validasiUser = require("../middlewares/validasi-user");
const checkError = require("../middlewares/error-handler");

router.get("/", (req, res) => {
    console.log(user);

    const viewUsers = user.map((userData) => ({
        fullName: userData.fullName,
        email: userData.email,
        bio: userData.bio,
        dob: userData.dob
    }));
    console.log(viewUsers)

    if (!viewUsers.length){
        return res.status(404).json({
            message: "Data not found"
        });
    }
    return res.status(200).json({
        message: "Sukses",
        data: viewUsers
    });
});

router.get("/:userId", validasiUser,  (req,res) =>{
    const userId = req.params.userId;
    const checkId = user.filter((item) => item.id === +userId)[0];
    
    validationResult(req).throw();
    
    if(!checkId){
        return res.status(400).json({
            message: "User not found"
        });
    }
    
    const viewUser = {
        fullName: checkId.fullName,
        email: checkId.email,
        bio: checkId.bio,
        dob: checkId.dob
    };

    return res.status(200).json({
        message: "Success",
        data: viewUser
    });
    
})
router.use(checkError)
module.exports = router;
