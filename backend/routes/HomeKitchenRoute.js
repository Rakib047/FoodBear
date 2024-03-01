const express = require('express');
const router = express.Router();

const controllers = require('../controllers/HomeKichenController');

router.route("/getorder/:orderId")
      .get(controllers.getSpecificOrder)

module.exports = router;