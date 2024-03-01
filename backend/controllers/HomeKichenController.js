const OrderModel = require("../models/OrderModel"); // Replace with the actual path to your Order model

const getSpecificOrder = async(req,res)=>{
    const orderId = req.params.orderId;
    try {
      // Find all orders for the specified orderId
      const order= await OrderModel.findById(orderId);
      res.send(order);
    }
    catch (error) {
      console.log("error in getting order");
      res.json({ message: "order not found!" });
    }
  }

module.exports = {
    getSpecificOrder,
}