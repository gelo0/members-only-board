const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true },
  timestamp: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
});

MessageSchema.virtual("url").get(function () {
  return `/message/${this._id}`;
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);
