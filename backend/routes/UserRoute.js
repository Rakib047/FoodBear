const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const controllers = require("../controllers/UserController");

const jwtSecret = "SheIsJustAGirlWhoClaimsThatIAmTheOneButTheKidIsNotMySon";
const Food = require("../models/FoodModel");


router.route("/restaurants")
      .get(controllers.showDashboard)


router.route("/:userId").get(controllers.showDashboard)


module.exports = router; 
