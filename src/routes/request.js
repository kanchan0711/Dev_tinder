const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../modals/user");
const requestRouter = express.Router();
const ConnectionRequest = require("../modals/connectionRequest");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const status = req.params.status;
      const toUserId = req.params.toUserId;

      const toUser = User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ message: "Requested user is not exist" });
      }

      const allowStatus = ["interested", "ignored"];
      if (!allowStatus.includes(status)) {
        return res.status(400).json({ message: "Request is not valid" });
      }

      // if(fromUserId.equals(toUserId)){
      //     return res.status(400).send({message: "Request is not allowed"})
      // }

      const newConnectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const isRequestExist = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      })

      if (isRequestExist) {
        return res.status(400).json({ message: "Request Already Done" });
      }

      await newConnectionRequest.save();
      res.send(newConnectionRequest);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);







// requestRouter.post("/request/view/:status/:requestId",userAuth, async (req, res) => {

//   try {
//     const {status, requestId} = req.params
//     const loginUser = req.user
  
//     const allowedStatus =["accepted", "rejected" ];
//     if(!allowedStatus.includes(status)) {
//       return res.status(400).json({message: "Invalid Request's Status"})
//     }
  
//     if(loginUser._id.equals(requestId)){
//       return res.status(400).json("You are not allowed to accept or ignor the request")
//     }
  
//     const connectionRequest = await ConnectionRequest.findOne(
//       {
//         _id: requestId,
//         toUserId: loginUser._id,
//         status:"interested"
//       }
//       )
  
//       if(!connectionRequest){
//          return res.status(400).json({message: "Connection request is not exist"})
//       }
  
//       connectionRequest.status = status
//       const data = await connectionRequest.save()
  
//       res.send("connection request " + status + " succesfully", data)
//   } catch (error) {
//       res.status(400).send(error.message)
//   }
 
// });



requestRouter.post("/request/view/:status/:requestId", userAuth, async (req, res) => {
  try {
    const { status, requestId } = req.params;
    const loginUser = req.user;


    console.log("Request ID:", requestId);
console.log("Logged-in User ID:", loginUser._id);

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid Request Status" });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loginUser._id, // Ensure this is correct
      status: "interested",
    });

    console.log(connectionRequest)
    if (!connectionRequest) {
      return res.status(400).json({ message: "Connection request does not exist" });
    }

    connectionRequest.status = status;
    const updatedRequest = await connectionRequest.save();

    res.json({ message: `Connection request ${status} successfully`, request: updatedRequest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



module.exports = requestRouter;
