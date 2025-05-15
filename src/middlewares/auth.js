const adminAuth=(req, res, next) => {
  console.log("admin auth is getting checked");
  const token = "xyz";
  const isAdminAutorized = token === "xyz";
  if (!isAdminAutorized) {
    res.status(401).send("unauthorized requwest");
  } else {
    next();
  }
};

const userAuth=(req, res, next) => {
  console.log("user auth is getting checked");
  const token = "xyz";
  const isAdminAutorized = token === "xyz";
  if (!isAdminAutorized) {
    res.status(401).send("unauthorized requwest");
  } else {
    next();
  }
};

module.exports={adminAuth,userAuth};