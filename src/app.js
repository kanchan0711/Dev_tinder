const express = require("express");
const app = express();
const User = require("./modals/user");
const connectDB = require("./config/database");


app.post("/signup", async (req, res) => {
    try {
        const user = new User({
            firstName: "kk",
            lastName: "software developer",
            emailId: "kan123@gmail.com",
            password: "kanchan777"
        });
        await user.save();
        res.send("User added successfully");
    } catch (error) {
        console.error("Error saving user:", error.message);
        res.status(500).send("Error saving user");
    }
});

 
connectDB()
.then(() =>{
    console.log("database is connected")
    app.listen(7777, ()=>{ 
        console.log("server is successfully listning on port 7777");
    })
})
.catch((err) =>{
    console.log("database is not connected")
}) 
 





// app.use("/", (req,res) => {
//     res.send("Namste kanchan");
// });  

// app.use("/hello", (req, res) => {
//     res.send ("Hello From hello")
// })

// app.use("/test", (req, res) =>{
//     res.send("hello from server");
// })

// app.listen(7777, () =>{
//     console.log("server is succesfully listing  on post 7777...")
// })  

// app.listen(7777, () =>{
//     console.log("server is listning successfully on port 7777... ")
// })