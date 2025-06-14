const express = require("express");

const requestRouter = express.Router();

const { adminAuth, userAuth } = require("../middlewares/auth");

const ConnectionRequest = require("../models/connectionrequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromuserId = req.user._id;
      const touserId = req.params.userId;
      const status = req.params.status;

      const statuses = ["interested", "ignore"];
      if (!statuses.includes(status)) {
        throw new Error("Invalid status type");
      }

      const touser = await User.findById(touserId);
      if (!touser) {
        throw new Error("User not found");
      }

      //if connection request exists already
      const existingconnectionrequest = await ConnectionRequest.findOne({
        $or: [
          { fromuserId, touserId },
          { fromuserId: touserId, touserId: fromuserId },
        ],
      });

      if (existingconnectionrequest) {
        throw new Error("connection request already exist");
      }

      const connectionrequest = new ConnectionRequest({
        fromuserId,
        touserId,
        status,
      });

      const data = await connectionrequest.save();
      res.json({
        message: req.user.firstName+" is "+status+" in "+ touser.firstName,
        data: data,
      });
    } catch (err) {
      res.status(500).send("Error: " + err.message);
    }
  }
);

module.exports = { requestRouter };
