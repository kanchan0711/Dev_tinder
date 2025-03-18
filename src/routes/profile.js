const express = require('express');
const User = require('../modals/user');
const { userAuth } = require("../middlewares/auth");
const {validateEditData, validatepassword } = require("../utils/validator")
const validator = require("validator");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view",userAuth, async(req, res) => {
    // const cookies = req.cookies;
  
    // const token = cookies?.token;
  
    // if(!token) {
    //   throw new Error("Invalid Token")
    // }
    // const decodedMessage =  jwt.verify(token, "KAN@777" )
  
    // const {_id } = decodedMessage
  
    // const user = await User.findById(_id)
    try{
        const user = req.user;
        if(!user) {
          throw new Error("user does not exist or Login Again")
        }
        res.send(user)
    }catch{
        res.status(400).send("ERROR :" + err.message);
    }
    // console.log(cookies)
    
  })


  profileRouter.patch("/profile/edit", userAuth, async (req,res) =>{
    try {
       
        const isEditAllowed = await validateEditData(req)

    if(!isEditAllowed){
        throw new Error("Edit is not allowed")
    }
    const loggedInUser = req.user
    

    Object.keys(req.body).forEach(keys => loggedInUser[keys] = req.body[keys])
    await loggedInUser.save()

    res.json({message: `${loggedInUser.firstName} your profile is updated successfuly` , data: loggedInUser})
    } catch(err){
       res.status(400).send("ERROR :" + err.message)
    }

  })


  profileRouter.patch("/profile/updatePassword",async(req, res) =>{
    try {
        const {emailId, password, newPassword} = req.body
       

       const user = await User.findOne({emailId})
    //    if(!user){
    //     throw new Error("User not exist")
    //    }

    //    const isPasswrdValid = User.validatePassWord(password)
    //    if(!isPasswrdValid){
    //     throw new Error("passowrd is not valid")
    //    }

       if(!validator.isStrongPassword(newPassword)){
        throw new Error ("please suggest strong pssowrd")
       }
        
       
        const newPasswordHash = await bcrypt.hash(newPassword, 10)
        user.password = newPasswordHash
         await user.save()
        res.send("edit")
    } catch (error) {
        res.status(400).send(error.message)
    }
       

  })

  module.exports = profileRouter;