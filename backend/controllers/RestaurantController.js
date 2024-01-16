const RestaurantModel = require("../models/RestaurantModel");
const UserModel = require("../models/UserModel");
const DeliveryPersonModel = require("../models/DeliveryPersonModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret =
  "EverythinginthisworldisChaoticthereisnomeaningofLifewehavetojustcreateit";

const signupRestaurant = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    const deliveryperson = await DeliveryPersonModel.findOne({
      email: req.body.email,
    });
    const restaurant = await RestaurantModel.findOne({
      email: req.body.email,
    });

    if (user || restaurant || deliveryperson) {
      return res.status(400).json({
        errors: [{ message: "Email Already exists!" }],
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newRestaurant = await RestaurantModel.create({
      name: req.body.name,
      location: req.body.location,
      email: req.body.email,
      password: hashedPassword,
      contact: req.body.contact,
      is_homekitchen: req.body.is_homekitchen,
      img: req.body.img,
    });
    res.status(200).json(newRestaurant);
  } catch (error) {
    console.log("error in signing up restu");
    res.json({ message: "restu sign up error!" });
  }
};

const loginRestaurant = async (req, res) => {
  try {
    const fetchedData = await RestaurantModel.findOne({
      email: req.body.email,
    });
    if (!fetchedData) {
      return res
        .status(400)
        .json({ errors: [{ message: "Email doesn't exist!" }] });
    }

    const salt = fetchedData.salt;
    const isMatched = await bcrypt.compare(
      req.body.password,
      fetchedData.password,
      salt
    );

    if (!isMatched) {
      return res.json({
        success: false,
      });
    }

    const data = {
      user: {
        id: fetchedData._id,
      },
    };

    const authToken = jwt.sign(data, jwtSecret);
    return res.json({
      success: true,
      authToken: authToken,
      restaurant_id: fetchedData._id,
    });
  } catch (error) {
    console.log("restaurant login failed");
    return res.json({
      success: false,
    });
  }
};

const showDashboard = async (req, res) => {
  try {
    
    const restaurants = await RestaurantModel.find({})

    res.status(200).send(restaurants);
  } catch (err) {
    console.log("error getting dashboard")
    res.status(404).json({
        success:false
    })
  }
};

const toggleRestaurantOpen = async (req,res)=>{
    const { restaurantId } = req.params;
 
    try {
      // Find the exact restu by ID
      const restaurant = await RestaurantModel.findById(restaurantId);
  
      if (!restaurant) {
        return res.status(404).json({ message: "Restuarant not found" });
      }
  
      // Toggle the is_open field
      restaurant.is_open = !restaurant.is_open; 
  
      // Save the updated state
      await restaurant.save();
  
      return res.status(200).json({ message: "is_open status updated", is_open: restaurant.is_open });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
  signupRestaurant,
  loginRestaurant,
  showDashboard,
  toggleRestaurantOpen,
};
