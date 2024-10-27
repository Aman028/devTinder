const adminauth = (req, res, next) => {
  const token = "xyz";
  const isauthenticated = token === "xyz";
  if (!isauthenticated) {
    res.status(401).send("not authorized");
  } else {
    next();
  }
};

const userauth = (req, res, next) => {
    const token = "xyzss";
    const isauthenticated = token === "xyz";
    if (!isauthenticated) {
      res.status(401).send("not authorized");
    } else {
      next();
    }
  };

module.exports = {
  adminauth,
  userauth
};
