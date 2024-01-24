const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const controllers = require("../controllers/UserController");

const jwtSecret = "SheIsJustAGirlWhoClaimsThatIAmTheOneButTheKidIsNotMySon";


router.route("/:userId").get(controllers.showDashboard)

router.route("/restaurants")
      .get()





module.exports = router; 
