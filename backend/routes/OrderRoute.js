const express = require("express")
const router = express.Router()
const controllers= require("../controllers/OrderController")
//user order portion
router.route("/user/orders/neworder")
      .post(controllers.placeUserOrder)
router.route("/user/orders/:userId")
      .get(controllers.getUserOrder)
router.route("/user/orders/pickeduporder/:orderId")
      .put()
//will be used in mycart
router.route("/user/food/:foodId")
      .get(controllers.getFoods)
//will be used in ordered foods
router.route("/user/foods")
      .get(controllers.getAllOrderedFoods)
//restaurant portion
router.route("/restaurant/orders/:restaurantId")
      .get()
router.route("/restaurant/deleteorder/:orderId")
      .delete()
router.route("/restaurant/orders/confirmorder/:orderId/:deliverypersonId")
      .put()

//delivery person portion
router.route("/deliveryperson/:deliverypersonId")
      .get()
router.route("/deliveryperson/orders/:deliverypersonId")
      .get()


module.exports = router;