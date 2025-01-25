const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://jik61340:kanchan777@07namstedev.gfbmc.mongodb.net/devtinder?retryWrites=true&w=majority",
        );
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
