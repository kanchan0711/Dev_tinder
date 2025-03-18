const mongoose = require("mongoose");
const validator = require("validator"); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { filteredList } = require("c/src/commands");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50, 
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if (!validator.isStrongPassword(value)){
            throw new Error("Enter strong password" + value)
        }
      }
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate: {
        validator: function (value) {
          // Define valid gender values
          return ["male", "female", "others"].includes(value);
        },
        message: (props) =>
          `${props.value} is not a valid gender. Valid options are male, female, or others.`,
      },
    },
    skills: {
      type: [String],
      minlength: 10,
    },
    about: {
      type: String,
      minlength: 50,
      maxlength: 200,
      default: "Hey! i am a software developer with 100000 rps monthly salary",
    },
    photoUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fdefault-user&psig=AOvVaw34c5Ptk6JnIMnlnBsGRGtw&ust=1739129358607000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJjGsvTntIsDFQAAAAAdAAAAABAE",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({_id: user._id}, "KAN@777",
   { expiresIn: "7d"}
  )
  return token ;
}


userSchema.methods.validatePassWord = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser, passwordHash
  )
  return isPasswordValid

}


userSchema.index({firstName: 1, lastName: 1})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
