const validator=require("validator");

const validateSignup=(req)=>{
    const lastName=req.body.lastName;
    const firstName=req.body.firstName;
    const emailId=req.body.emailId;
    const password=req.body.password;
    if(!firstName||!lastName)
    {
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(emailId))
    {
        throw new Error("email is not valid");
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("weak password");
    }
};

module.exports={validateSignup};