const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const controllers = require("../controllers/UserController");

const jwtSecret = "SheIsJustAGirlWhoClaimsThatIAmTheOneButTheKidIsNotMySon";

router.route("/restaurants")
      .get(controllers.getAllRestaurant)

router.route("/:userId")
      .get(controllers.showDashboard)

router.route("/addtocart")
      .post(controllers.addToCart)
router.route("/getcart")
      .post(controllers.getCart) 

router.route("/favorites/add")
      .post(controllers.addFavourite)
router.route("/favorites/remove")
      .post(controllers.removeFavourite)
router.route("/favorites/:userId")
      .get(controllers.getFavourite)




module.exports = router; 
