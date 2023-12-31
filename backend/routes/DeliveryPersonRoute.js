const express = require("express")
const router = express.Router()
const controllers= require("../controllers/DeliveryPersonController")

router.route("/login")
        .post(controllers.loginDeliveryPerson)

router.route("/signup")
        .post(controllers.signupDeliveryPerson)

module.exports = router;