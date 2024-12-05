const mongoose = require('mongoose')

const captainSchema = new mongoose.Schema({

    fullname:{
        firstname:{
            type:String,
            minLength: 3 ,
            required:true
        },
        lastname:{
            type:String,
            minLength: 3 ,
        }
    }


})