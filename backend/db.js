const mongoose = require("mongoose")
const colors= require("colors")
//you can use any of the following
//const MONGO_URI="mongodb+srv://rakib047:Rakib22422m@merndb.nlsauhz.mongodb.net/FoodBear?retryWrites=true&w=majority"
const MONGO_URI="mongodb://localhost:27017/FoodBear_Local"
const mongoDB = async() =>{
    await mongoose.connect(MONGO_URI,{ useNewUrlParser: true })
    console.log(`Connected to MONGODB`.cyan.bold.italic)
}

module.exports = mongoDB