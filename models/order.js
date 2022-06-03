const { Schema, model } = require("mongoose");

const order = new Schema({
  user: {
    name: String,
    id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  courses: [
    {
      course: { type: Object, required: true },
      count: { type: Number, required: true },
    },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = model("Order", order);
