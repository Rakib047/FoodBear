const express = require("express")
const router = express.Router()
const controllers= require("../controllers/RestaurantController")

router.route("/signup")
        .post(controllers.signupRestaurant)
router.route("/login")
        .post(controllers.loginRestaurant)
router.route("/dashboard")
      .get(controllers.showDashboard)
router.route("/isopen/:restaurantId")
      .put(controllers.toggleRestaurantOpen)
module.exports = router;