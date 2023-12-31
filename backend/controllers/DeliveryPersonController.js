const DeliveryPersonModel=require("../models/DeliveryPersonModel")
const bcrypt = require("bcryptjs")
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const jwtSecret="EverythinginthisworldisChaoticthereisnomeaningofLifewehavetojustcreateit"

const signupDeliveryPerson = async (req,res) =>{
    const salt=await bcrypt.genSalt()
    const hashedPassword=await bcrypt.hash(req.body.password,salt)

    try {

        const newDeliveryPerson = await DeliveryPersonModel.create(
            {
                name : req.body.name,
                location: req.body.location,
                email : req.body.email,
                password : hashedPassword,
                contact : req.body.contact
            }
        )
        res.status(200).json(newDeliveryPerson)
        
    } catch (error) {

        console.log("error creating new delivery person")
        res.status(400).json({ message: "Not registered!" })
        
    }
}

const loginDeliveryPerson = async (req,res) =>{

}

module.exports = {
    signupDeliveryPerson,
    loginDeliveryPerson
}