const Razorpay = require('razorpay');

const crypto = require('crypto');
const PaymentModel =require('../Model/OrderModel')


const { config } = require('dotenv')

config({ path: "../config/config.env" })

const instance = new Razorpay({
    key_id: process.env.RAZOPAY_API_KEY,
    key_secret: process.env.RAZOPAY_SECRET_KEY,
});



const CheckOut = async (req, res) => {

    try {

        var options = {
            amount: Number(req.body.amount *100), 
            currency: "INR",

        };
        const orders = await instance.orders.create(options);
        res.status(200).send({ status: true, data: orders })


    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}






const PaymentVerification = async (req, res) => {
    try {

      console.log('rahul chutiyaaaa',res.razorpay_payment_id,response.razorpay_payment_id,req.razorpay_payment_id)
   
       


        res.status(200).send({ status: true, data:req.body})


    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


const VerifyPayment = async (req, res) => {
    try {
        const { paymentId, orderId, signature } = req.body;


        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZOPAY_SECRET_KEY)
            .update(`${orderId}|${paymentId}`)
            .digest('hex');

        if (generatedSignature !== signature) {
            return res.status(400).send({ status: false, msg: "Transaction is not Legit" });
        }

        // If the signature matches, redirect to the success page

        await PaymentModel.create({
            razorpay_order_id:orderId,
            razorpay_payment_id:paymentId,
            razorpay_signature:signature,
          });

       return res.status(200).send({ status: true, msg: orderId });

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
};








module.exports = {CheckOut , PaymentVerification , VerifyPayment}