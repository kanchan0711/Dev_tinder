const validator = require("validator");

const validateSignupData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    } 
    
    else if(!validator.isStrongPassword(password)) {
        throw new Error("please enter a strong password", Error.massage);
    } 
    else if(!validator.isEmail(emailId)) {
        throw new Error("please enter a corret email")
    }
}


    const validateEditData = (req) => {
    const allowEditFields = ["firstName","lastName", "age", "skills"]
  
    const isEditAllowed =  Object.keys(req.body).every(field =>
      allowEditFields.includes(field)
    )
  
    return isEditAllowed
  } 
    
  const validatepassword = (password) =>{
   
        if(!validator.isStrongPassword(password)){
            throw new Error("please enter a strong password")
        }
        
    
  }


module.exports = {
    validateSignupData,validateEditData, validatepassword
}