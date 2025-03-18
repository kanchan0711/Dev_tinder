const express = require("express");
const app = express();
const User = require("./modals/user");
const connectDB = require("./config/database");
const cookieParser = require('cookie-parser')
// const { validatePassWord, getJWT} = require("./modals/user")

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter)
 
connectDB()
  .then(() => {
    console.log("database is connected");
    app.listen(7777, () => {
      console.log("server is successfully listning on port 7777");
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // Exit the process if DB connection fails
  });



























































































// login user
// app.post("/login", async(req, res) => {
//     try {
//         const {emailId, password} = req.body;

//         const user = await User.findOne({emailId});
//         if(!user){
//             throw new Error("User does not exist")
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password)
//    if(isPasswordValid){
//      res.send("login sucsessfully")
//    }else{
//     throw new Error("INvalid Password")
//    }
        
//     } catch (error) {
//         res.status(400).send("ERROR :", error.message)
//     }
// })













// app.post("/signup", async (req, res) => {
//     try {
//         console.log("Incoming signup request:", req.body); // Debugging

//         validateSignupData(req);  // Validate user input

//         const user = new User(req.body); // Create new user
//         await user.save(); // Save user to database

//         res.send("User added successfully");
//     } catch (error) {
//         console.error("Error saving user:", error.message);

//         // Return validation errors properly
//         res.status(400).send({ error: error.message });
//     }
// });

//find user using emailID
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;

//   try {
//     const users = await User.find({ emailId: userEmail });

//     if (users.length === 0) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(users);
//     }
//   } catch (error) {
//     res.status(500).send("Error in finding the user");
//   }
// });

// //feed api
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     // await users.save();
//     res.send(users);
//   } catch (error) {
//     res.status(500).send("error in data fetching");
//   }
// });

// app.patch("/user", async (req, res) => {
//   // const userId = req.params.userId; // Extract userId from route parameters
//   const { _id, skills, ...data } = req.body; // Destructure skills separately

//   // Allowed fields for update
//   const ALLOWED_UPDATE = [
//     "firstName",
//     "lastName",
//     "gender",
//     "emailId",
//     "skills",
//   ];

//   // Validate if all fields in the request are allowed
//   const isUpdateAllowed = Object.keys(data).every((key) =>
//     ALLOWED_UPDATE.includes(key)
//   );
//   if (!isUpdateAllowed) {
//     return res.status(400).send("Update not allowed");
//   }

//   // Validate skills length if skills exist in the request
//   if (skills && skills.length > 10) {
//     return res.status(400).send("Skills cannot be more than 10");
//   }

//   try {
//     // Include skills in the update if provided
//     const updateData = skills ? { ...data, skills } : data;

//     // Update the user in the database
//     const user = await User.findByIdAndUpdate(_id, updateData, { new: true });

//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     res.send({
//       message: "User updated successfully",
//       user,
//     });
//   } catch (error) {
//     console.error("Error updating user:", error.message);
//     res.status(500).send("An error occurred while updating the user");
//   }
// });

// // delete API
// app.delete("/delete", async (req, res) => {
//   const user = req.body._id;
//   try {
//     const users = await User.findByIdAndDelete(user);
//     res.send({ message: "User deleted successfully", users });
//   } catch (error) {
//     res.status(500).send("Error in deleting the user.");
//   }
// });





// to update the user

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
