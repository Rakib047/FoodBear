const express = require("express")
const cors= require("cors")
const app = express()
const PORT=4010
const mongoDB=require("./db")
mongoDB();

app.use(cors())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})

app.get('/', (req, res) => {
    res.send("working")
})


app.use(express.json())

app.use("/api/userauth",require("./routes/UserAuthRoute"))
app.use("/api/restaurant",require("./routes/RestaurantRoute"))
app.use("/api/deliveryperson",require("./routes/DeliveryPersonRoute"))


app.listen(PORT,()=>{
    console.log(`PORT NO : ${PORT}`.blue.bold.italic)
})

