const express = require("express");

const {register,login,logout,me} = require("../controllers/authController");
const {authenticateRole} = require("../middleware/authorizeRole");
const {authenticateToken} = require("../middleware/authMiddleware");
const {authenticateAdmin} = require("../middleware/authorizeAdmin");
const {isCorrectUsername,isCorrectRole} = require ('../validators/VerifInput')
const {refreshing} = require ("../controllers/authRefresh");
const { ExpressValidator} = require('express-validator');
const {checkErrors} = require('../middleware/checkErrors')
const router = express.Router();
const {body} = new ExpressValidator({isCorrectUsername,isCorrectRole});
    



router.post("/register",body('username').isCorrectUsername(body('username')),body('email').isEmail()
,body('password').isLength({min : 8})
,body('role').isCorrectRole()
,checkErrors, register);
router.post("/login", login);
router.post ("/refresh",refreshing)
router.post ("/logout",authenticateToken,logout);
router.get("/me",me)
router.post("/checkingLogin", authenticateToken,(req,res)=>{
    res.status(200).json({message : "logged in",ok : true})
});
router.get("/role", authenticateToken, authenticateRole,authenticateAdmin, (req, res) => {
    try{
        res.status(200).json({ message: "authorized" });
    }
    catch(err){
        res.status(500).json({"message" : err.message});
    }
});
    
module.exports = router;