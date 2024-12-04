const user = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');


module.exports.authUser = async (req, res, next ) =>{

    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    
    if(!token) {
        res.status(401).json({message: 'UnAuthorized'})
    }


    const isBlacklisted = await userModel.findOne({ token : token });

    if(isBlacklisted){
        res.status(401).json({message: 'UnAuthorized'})
    }


    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user ; 
        return next();
    }
    catch (err) {
        res.status(401).json({message: 'UnAuthorized'})
        console.log(err);
    }
}