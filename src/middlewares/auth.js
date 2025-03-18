const jwt = require("jsonwebtoken");
const User = require("../modals/user");


const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;

        const token = cookies?.token;

        console.log(token)
        if(!token) {
            throw new Error("Token is invalid or login please");
        }

        const decodedOBJ = jwt.verify(token, "KAN@777");
        const { _id } = decodedOBJ;

        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }

        req.user = user;
        console.log(user, "from auth")
        next()

    }catch(err) {
        res.status(400).send("ERROR: " + err.message); 
    }
}

module.exports = {
    userAuth,
}