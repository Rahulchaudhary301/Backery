const express = require('express')
const Router = express.Router()



Router.get('/con',(req,res)=>{
    res.send({status:true, msg: "Successfully"})
})



Router.get('/connection', (req,res)=>{
    try {

        res.status(200).send({ status: true, msg: 'okkk it connected......'})
        
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
})



module.exports = Router