const RestaurantModel = require("../models/RestaurantModel");
const FoodCategoryModel = require("../models/FoodCatagoryModel");
const FoodModel = require("../models/FoodModel");
const UserModel = require("../models/UserModel");
const DeliveryPersonModel = require("../models/DeliveryPersonModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret =
  "EverythinginthisworldisChaoticthereisnomeaningofLifewehavetojustcreateit";


const showDashboard = async (req, res) => {
   const userId = req.params.userId
    try {
      const user = await UserModel.findById(userId)
  
      res.status(200).send(user);
    } catch (err) {
      console.log("error getting dashboard");
      res.status(404).json({
        success: false,
      });
    }
  };

const getAllRestaurant = async(req,res)=>{
  try {

      const restaurants=await RestaurantModel.find({})
      console.log(restaurants.length)
      res.send(restaurants)
  } catch (error) {
    console.log(error);
    return res.json({ success: false });
  }
}

const addToCart = async (req,res) => {
  const userId = req.params.userId;
  try {

    const user = await UserModel.findById(userId);

    //console.log(user._id);
    

    if(req.body.food_id==null){
      console.log("food not found");
    }
    await CartModel.create({
      user_id: req.body.user_id,
      food_id: req.body.food_id,
      restaurant_id: req.body.restaurant_id
    })
    res.json({ message: "Food added to cart!!" });
  }
  catch (error) {
    console.log("error add to card");
    res.status(404).json({
      success: false,
    });
  }
} 

const getCart = async (req,res) => {
  const userId = req.body.user_id;
  try {
    const cart = await CartModel.find({userId});
    res.json(cart);

  } catch (error) {
    console.log("error get card");
    res.status(404).json({
      success: false,
    });
    
  }
}

const addFavourite = async(req,res)=>{
  try {
    const { userId, restaurantId } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).send("User not found");

    user.favorites.push(restaurantId);
    await user.save();

    res.send('Added to favorites');
  } catch (error) {
    console.error("Save failed:", error);
  return res.status(500).json({ error: error.toString() });
    // res.status(500).send('Server error');
  }
}

const removeFavourite = async(req,res)=>{
  try {
    const { userId, restaurantId } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).send("User not found");

    user.favorites = user.favorites.filter(id => id.toString() !== restaurantId);
    await user.save();

    res.send('Removed from favorites');
  } catch (error) {
    res.status(500).send('Server error');
  }
}

const getFavourite = async (req,res)=>{
  try {
    const { userId } = req.params;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    
      const user = await UserModel.findById(userId).select('favorites -_id');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the favorite restaurant IDs
      const favoriteRestaurantIds = user.favorites.map(fav => ({ _id: fav }));
  
      // Fetch all favorite restaurants by their IDs
      const favoriteRestaurants = await Restaurant.find({
        '_id': { $in: favoriteRestaurantIds }
      });
  
      res.json(favoriteRestaurants);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    showDashboard,
    getAllRestaurant,
    addToCart,
    getCart,
    addFavourite,
    removeFavourite,
    getFavourite
};