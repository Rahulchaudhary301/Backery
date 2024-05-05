const express = require('express')
const app = express()
const { default : mongoose } = require('mongoose')
const cors = require('cors')
const {config}=require('dotenv')
const router=require('./src/Router/PaymentRouter.js')

const Razorpay =require('razorpay')

config({path:"../config/config.env"})

app.use(express.json())
app.use(cors())

mongoose.connect(`mongodb+srv://RahulChaudhary:${process.env.MONGO_DB}.mongodb.net/Tomato_Website?retryWrites=true&w=majority`, { useNewUrlParser: true })
.then( () => console.log("MongoDb is connected"))
.catch( (error) => console.log(error.message))



 const instance = new Razorpay({
    key_id: process.env.RAZOPAY_API_KEY,
    key_secret: process.env.RAZOPAY_SECRET_KEY,
  });


app.use('/',router)

app.get('/getKey',(req,res)=>{
    res.status(200).send({key:process.env.RAZOPAY_API_KEY,})
})



app.listen( process.env.PORT , function(){
    console.log(`Express app is running on port ${process.env.PORT}`)
})

