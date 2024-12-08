const express = require('express')
const router = express.Router()
const captainController = require('../controllers/captain.controller')
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware')

router.post('/register' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage("Min length of Name Should be at least 3 Characters"),
    body('password').isLength({min: 8 }).withMessage("password must be 8 characters long "),
    body('vehicle.color').isLength({min: 3}).withMessage('Vehicle Color must be atleast 3 Characters Long'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Vehicle Plate Number must be atleast 3 Characters Long'),
    body('vehicle.capacity').isLength({min: 1}).withMessage('Vehicle Capacity must be atleast 1 Characters Long'),
    body('vehicle.vehicleType').isIn([ 'car' , 'motorcycle' , 'auto']).withMessage('Invalid Vehicle Type '),
],
captainController.registerCaptain
)

router.post('/login' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 8 }).withMessage("password must be 8 characters long ")    
],
captainController.loginCaptain
)
router.get('/profile' ,authMiddleware.authCaptain , captainController.getCaptainProfile)


router.get('/logout' , authMiddleware.authCaptain , captainController.logoutCaptain)



module.exports = router;