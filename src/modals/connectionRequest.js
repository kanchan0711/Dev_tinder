const mongoose = require("mongoose")
const userModel = require("./user")

const connectionRequestSchema = mongoose.Schema(
    {
        fromUserId :{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        toUserId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: String,
            requires: true,
            enum: ["interested", "ignored", "accepted", "rejected" ]
        }
    },
    {
        timestamps: true
    }
)

connectionRequestSchema.index({fromUserId: 1, toUserId: 1})// this is a compount indeing to fectch data faster from connection reaquest schema

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this
    let err
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        err = new Error("Cannot send request to yourself");  // ✅ Stops validation
    }

    next(err);
});

const connectionRequestModel = mongoose.model("connectionRequest", connectionRequestSchema)

module.exports = connectionRequestModel;