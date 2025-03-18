const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const User = require("../modals/user")
const ConnectionRequest = require("../modals/connectionRequest")

const USER_SAFE_DATA = "firstName lastName age skills gender photoUrl about"
userRouter.get("/user/request/recived",userAuth, async(req, res) =>{
   const user = req.user;

   const data = await ConnectionRequest.find({
    toUserId: user._id,
    status: "interested"
   }).populate("fromUserId", USER_SAFE_DATA)

   res.json({message: "your requests", data})
})

userRouter.get("/user/connection", userAuth, async(req, res) => {

  try {
    const user = req.user;

    const connectionRequests = await ConnectionRequest.find({
        $or : [
            {fromUserId: user._id, status: "accepted"},
            {toUserId: user._id, status: "accepted"}
        ]}
    ).populate("fromUserId", USER_SAFE_DATA)
    .populate("toUserId", USER_SAFE_DATA)

    const data = connectionRequests.map(req => {
        if(req.fromUserId._id.toString() === user._id.toString()){
            return req.toUserId;  // ✅ Corrected
        }
        return req.fromUserId;  // ✅ Corrected
    });
    
    res.send({message: "Your Connections are", data: data})
  } catch (error) {
    res.status(400).send({message: error.message})
  }
})


userRouter.get("/feed", userAuth, async(req, res) => {
  const user = req.user;

  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  limit = limit >50? 50: limit;
  const skip = (page -1)*limit 

  let hideUserFromFeed =  new Set()
  const connections = await ConnectionRequest.find({
    $or:[
      {fromUserId: user._id},
      {toUserId: user._id}
    ]
  }).select("fromUserId toUserId",)
  console.log(connections)

  connections.forEach((connection) => {
    hideUserFromFeed.add(connection.fromUserId.toString());
    hideUserFromFeed.add(connection.toUserId.toString())

  })
  console.log(hideUserFromFeed)

  const feedUsers = await User.find({
    $and:[
      {_id: {$nin: Array.from(hideUserFromFeed) }},
      {_id: {$ne: user._id}}
    ]}).select(USER_SAFE_DATA)
    .skip(skip)
    .limit(limit)
  
  
  
  res.send({data: feedUsers})
  
})
module.exports = userRouter;