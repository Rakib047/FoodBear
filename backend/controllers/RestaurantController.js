const RestaurantModel= require("../models/RestaurantModel")
const UserModel= require("../models/UserModel")
const DeliveryPersonModel= require("../models/DeliveryPersonModel")
const bcrypt = require("bcryptjs")
const jwt=require("jsonwebtoken")
const jwtSecret="EverythinginthisworldisChaoticthereisnomeaningofLifewehavetojustcreateit"



const signupRestaurant = async (req,res) => {
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

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(req.body.password,salt)

        const newRestaurant=await RestaurantModel.create(
            {
                name : req.body.name,
                location : req.body.location,
                email: req.body.email,
                password: hashedPassword,
                contact: req.body.contact,
                is_homekitchen: req.body.is_homekitchen,
                img: req.body.img
            }
        )
        res.status(200).json(newRestaurant)
    } catch (error) {

        console.log("error in signing up restu")
        res.json({message:"restu sign up error!"})
    }
}

const loginRestaurant = async (req,res) => {
    try {
        const fetchedData=await RestaurantModel.findOne(
            {
                email: req.body.email
            }
        )
        if(!fetchedData){
            return res.status(400).json({ errors: [{ message: "Email doesn't exist!" }]});
        }

        const salt=fetchedData.salt
        const isMatched=bcrypt.compare(req.body.password,fetchedData.password,salt)

        const data={
            user:{
                id:fetchedData._id
            }
        }

        const authToken=jwt.sign(data,jwtSecret)
        return res.json(
            {
                success:true,
                authToken:authToken,
                restuarant_id:data
            }
        )
    } catch (error) {
        console.log("restaurant login failed")
        return res.json(
            {
                success:false
            }
        )
    }
}

module.exports = {
    signupRestaurant,
    loginRestaurant
}