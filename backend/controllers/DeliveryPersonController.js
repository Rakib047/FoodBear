const DeliveryPersonModel = require("../models/DeliveryPersonModel");
const UserModel= require("../models/UserModel")
const RestaurantModel = require("../models/RestaurantModel")
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtSecret =
  "EverythinginthisworldisChaoticthereisnomeaningofLifewehavetojustcreateit";

const signupDeliveryPerson = async (req, res) => {
  try {

    const user=await UserModel.findOne(
        {
            email:req.body.email
        }
    )
    const deliveryperson=await DeliveryPersonModel.findOne(
        {
            email:req.body.email
        }
    )
    const restaurant=await RestaurantModel.findOne(
        {
            email:req.body.email
        }
    )

    if(user||restaurant||deliveryperson){
        return res.status(400).json(
            {
                errors: [{message: "Email Already exists!"}]
            }
        )
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newDeliveryPerson = await DeliveryPersonModel.create({
      name: req.body.name,
      location: req.body.location,
      email: req.body.email,
      password: hashedPassword,
      contact: req.body.contact,
    });
    res.status(200).json(newDeliveryPerson);
  } catch (error) {
    console.log("error creating new delivery person");
    res.status(400).json({ message: "Not registered!" });
  }
};

const loginDeliveryPerson = async (req, res) => {
  try {
    const fetchedData = await DeliveryPersonModel.findOne({
      email: req.body.email,
    });
    if (!fetchedData) {
      console.log("dPerson nai");
      return res
        .status(404)
        .json({ errors: [{ message: "Email doesn't exist!" }] });
    }
    const salt = fetchedData.salt;
    const isMatched = bcrypt.compare(
      req.body.password,
      fetchedData.password,
      salt
    );

    if (!isMatched) {
      return ers
        .status(400)
        .json({ errors: [{ message: "Enter valid credentials!" }] });
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
    });
  } catch (error) {
    console.log("login error in delivery person");
    return res.json({ success: false });
  }
};

module.exports = {
  signupDeliveryPerson,
  loginDeliveryPerson,
};
