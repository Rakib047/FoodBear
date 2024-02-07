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
router.route("/foods")
      .get(controllers.getAllFood)
router.route("/addfood")
      .post(controllers.addFood)
router.route("/deletefood/:foodId")
      .delete(controllers.deleteFood)
router.route("/editfood/:foodId")
      .put(controllers.editFood)
router.route("/fooditems/stockout/:foodId")
      .put(controllers.stockoutToggle)
router.route("/updateStock/:foodId/:restaurantId")
      .put(controllers.updateStock)
router.route("/rating/:restaurantId")
      .get(controllers.getRating)
      .put(controllers.setUserRating)
router.route("/review/:restaurantId")
      .get(controllers.getReview)
      .put(controllers.setUserReview)
router.route("/:id/ratings")
      .get(controllers.getSpecificRestaurantRating)
router.route("/:restaurantId")
      .get(controllers.getSpecificRestaurant)


module.exports = router;