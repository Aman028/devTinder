const adminauth = (req, res, next) => {
  const token = "abc";
  const isauthorized = token === "abc";
  if (!isauthorized) {
    res.status(401).send("unauthorized request");
  } else {
    next();
  }
};

const userauth = (req, res, next) => {
  const token = "xyz";
  const isauthorized = token === "xyz";
  if (!isauthorized) {
    res.status(401).send("unauthoized request");
  } else {
    next();
  }
};

module.exports = { adminauth, userauth };
