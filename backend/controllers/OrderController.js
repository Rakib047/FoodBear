const mongoose = require("mongoose");
const OrderModel= require("../models/OrderModel")
const FoodModel= require("../models/FoodModel")

const getFoods = async(req,res)=>{
    const foodId = req.params.foodId;
    try {
      //database theke data fetch kortesi
      const food = await FoodModel.findById(foodId);
  
      //backend theke frontend e data pathaitesi
      res.send(food);
    } catch (error) {
      console.log(error);
      return res.json({ success: false });
    }
}

const placeUserOrder = async(req,res)=>{
  received_food_items= []
  for(let i = 0; i < req.body.food_items.length; i++){
    received_food_items.push({
      food_id: req.body.food_items[i].id,
      quantity: req.body.food_items[i].quantity
    })
  }
  try {
    const temp= await OrderModel.create({
      user_id: req.body.user_id,
      restaurant_id: req.body.restaurant_id,
      food_items: received_food_items,
      total_price: req.body.total_price,
      payment_method: req.body.payment_method,
    });
    console.log("in temp",temp)
    res.json({ message: "New order placed!" });
  } catch (error) {
    console.log(error);
    res.json({ message: "order not placed!" });
  }
}

const getAllOrderedFoods = async(req,res)=>{
  try {
    //database theke data fetch kortesi
    const fetched_data = await mongoose.connection.db.collection("foods");
    const foods = await fetched_data.find({}).toArray();

    //backend theke frontend e data pathaitesi
    res.send(foods);
  } catch (error) {
    console.log(error); 
    return res.json({ success: false });
  }
}

const getUserOrder = async(req,res)=>{
  const userId = req.params.userId;
  try {
    // Find all orders for the specified userId
    const orders = await OrderModel.find({ user_id: userId });

    if (!orders) {
      return res
        .json({ message: "No orders found for this user." });
    }

    // Send the orders as a response
    console.log(orders)
    res.send(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports={
    getFoods,
    placeUserOrder,
    getAllOrderedFoods,
    getUserOrder
}