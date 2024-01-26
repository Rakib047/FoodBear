const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const controllers = require("../controllers/UserController");

const jwtSecret = "SheIsJustAGirlWhoClaimsThatIAmTheOneButTheKidIsNotMySon";

router.route("/restaurants")
      .get(controllers.getAllRestaurant)

router.route("/:userId")
      .get(controllers.showDashboard)

router.route("/getcard")
      .post()
router.route("/gettocard")
      .post()      





module.exports = router; 
