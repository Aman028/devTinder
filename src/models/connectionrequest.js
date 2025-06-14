const mongoose = require("mongoose");

const connectionrequestSchema = new mongoose.Schema(
  {
    fromuserId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    touserId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    status: {
      type: String,
      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);

connectionrequestSchema.index({ fromuserId: 1, touserId: 1 });

connectionrequestSchema.pre("save", function (next) {
  const connectionrequest = this;
  if (connectionrequest.fromuserId.equals(connectionrequest.touserId)) {
    throw new Error("ypu cannot send connection request to ypurself");
  }
  next();
});

const ConnectionRequest = new mongoose.model(
  "connectionRequest",
  connectionrequestSchema
);

module.exports = ConnectionRequest;
