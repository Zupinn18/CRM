const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");


// Signup user
exports.register = async(req,res)=>{
    try {
        const {
            fullName,
            email,
            password,
            confirmPassword,
            phoneNumber
        } = req.body;
        // Validate fields
        if(!fullName || !email || !password || !confirmPassword){
            return res.status(403).json({
                success:false,
                message:'All fields are mandatory !, Please Try Again'
            });
        }
        
        // Check if both password matches or not
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:`Password doesn't match, Both password must be same`
            });
        }

        // check if user already registered with us or not
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message : 'User already exists. Please Login to continue.',
            });
        }

        // create a user

    } catch (error) {
        
    }
}