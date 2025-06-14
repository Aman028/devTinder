const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email id is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not Strong");
  }
};

const iseditallowed = (req) => {
  const allowededit = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];

  const isallowed = Object.keys(req.body).every((field) =>
    allowededit.includes(field)
  );
  if(isallowed)
  {
    return true;
  }
  return false;
};

module.exports = { validateSignUp,iseditallowed };
