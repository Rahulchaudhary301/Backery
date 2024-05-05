const mongoose=require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId;




const PaymentData= new mongoose.Schema({

    razorpay_order_id:{
    type:String,
    trim:true
  },
  razorpay_payment_id:{
        type:String,
        trim:true
      },
      razorpay_signature:{
        type:String,
        trim:true
      },

      isDeleted:{
        type:Boolean,
        default:false
      }
   

},{timestamps:true})


module.exports= mongoose.model('Payment_Order',PaymentData)