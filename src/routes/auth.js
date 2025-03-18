const express = require("express");
const authRouter = express.Router();
const User = require("../modals/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateSignupData } = require("../utils/validator");


authRouter.post("/signup", async(req, res) => {
    try {
        validateSignupData(req);
        const { firstName, lastName, emailId, password } = req.body;
        const passswordHash = await bcrypt.hash(password, 10);
        const user = new User({
          firstName,
          lastName, 
          emailId,
          password: passswordHash,
        }); // it take the req from body and save the uer
        await user.save();
        res.send("User added successfully");
      } catch (error) {
        console.error("Error saving user:", error.message);
        res.status(500).send("Error saving user");
      }
}) 


authRouter.post("/login", async (req, res) => {
    try {


        const { emailId, password } = req.body; // ✅ Fix variable name
        console.log(emailId, password)
        const user = await User.findOne({ emailId });
        if (!user) {
            return res.status(404).json({ error: "User does not exist" });
        }

        // const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPasswordValid = await  user.validatePassWord(password)
        if (isPasswordValid) {
            // const token =  jwt.sign({_id:user._id}, "KAN@777",{
            //   expiresIn: "1d"
            // })

            const token = await user.getJWT()
            console.log(token)
            
            res.cookie("token", token)
            res.send({ message: "Login successful" });
       } else {
        throw new Error("Invalid Credentials")
       }
       
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ error: error.message }); // ✅ Fix response format
    }
});


authRouter.post("/logout",(req,res) =>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    })
    res.send("Logout Successful!")
})


module.exports = authRouter; 