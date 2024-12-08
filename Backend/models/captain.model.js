const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
    },
    email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
    },
    password:{
            type:String,
            required:true ,
            select : false 
    },


    socketId:{
        type:String
    },

    status:{
        type:String,
        status:['active' , 'inactive'],
        deafult:'inactive'
    },

    vehicle:{
        color:{
            type:String,
            required:true,
            minLength:[3 , "Color must be at least 3 Characters long"]
        },
        plate:{
            type:String,
            reuqired:true,
            minLength:[3 , "plate number must be at least 3 Charcaters long"]
        },
        capacity:{
            type: Number,
            required:true,
            min: [1 , "capacity should be minimum 1 "] 
        },
        vehicleType:{
            type:String, 
            required:true,
            enum: ['car' ,'motorcycle' , 'auto']
        }
    },

    location:{
        latitude:{
            type:Number,
      
        },
        
        longitude:{
            type:Number,
        }
    }

})

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id} , process.env.JWT_SECRET ,{ expiresIn : '24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password);
}

captainSchema.statics.hashpassword =async function(password){
    return await bcrypt.hash(password , 10);
}

const captainModel = mongoose.model('captain' , captainSchema)

module.exports = captainModel;