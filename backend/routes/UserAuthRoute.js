const express = require("express")
const router = express.Router()
const controllers= require("../controllers/UserAuthController")

router.route("/login")
        .post(controllers.loginUser)

router.route("/signup")
        .post(controllers.signupUser)

module.exports=router