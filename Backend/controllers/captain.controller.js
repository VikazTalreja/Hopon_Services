const { validationResult } = require('express-validator')
const captainModel = require('../models/captain.model')
const captainService = require ("../services/captain.service")
const blackListTokenModel = require("../models/blacklistToken.model")

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
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({token , captain});

}


module.exports.loginCaptain = async(req,res,next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : error.array()})
    }

    const {email , password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password');

    if(!captain){
        return res.status(401).json({message: 'Invalid email or Password'});
    }
    const isMatch = await captain.comparePassword(password);
    
    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or Password'});
    }

    const token = captain.generateAuthToken();
    
    res.cookie('token',token);
    res.status(200).json({token , captain});
}

module.exports.getCaptainProfile = async (req, res , next) => {   
    res.status(200).json(req.captain);
}


module.exports.logoutCaptain = async( req , res , next ) =>{
    res.clearCookie('token');

    
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
    
    await blackListTokenModel.create( { token });

    res.status(200).json({ message : 'Sucessfully Logged Out'});

}