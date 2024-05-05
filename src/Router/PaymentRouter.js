const express = require('express')
const Router = express.Router()

const chekout=require("../Controller/PaymentController")

const {config}=require('dotenv')

config({path:"../config/config.env"})




Router.get('/conv',(req,res)=>{
    res.send({status:true, msg: "Successfully"})
})

Router.post('/check',chekout.CheckOut)

Router.post('/paymentVerification',chekout.PaymentVerification)

Router.post('/verify-payment',chekout.VerifyPayment)







module.exports = Router