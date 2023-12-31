const express = require("express")
const router = express.Router()
const controllers= require("../controllers/RestaurantController")

router.route("/signup")
        .post(controllers.signupRestaurant)
router.route("/login")
        .post(controllers.loginRestaurant)

module.exports = router;