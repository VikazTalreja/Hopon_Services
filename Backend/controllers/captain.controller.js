const { validationResult } = require('express-validator')
const captainModel = require('../models/captain.model')
const captainService = require ("../services/captain.service")



module.exports.registerCaptain = async (req,res,next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const { fullname , email , password , vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});

    if(isCaptainAlreadyExist){
        return res.status(400).json({message: 'captain already exist'})
    }

    const hashedpassword = await captainModel.hashpassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname ,
        lastname: fullname.lastname ,
        email,
        password: hashedpassword , 
        color: vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({token , user});

}