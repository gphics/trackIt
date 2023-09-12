const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: { type: String, required: true },
    note: { type: String, required: true },
    dueDate: { type: Date, required: true },
    repeat: { type: Boolean, default: false },
    isUpdated: { type: Boolean, default: false },
    repetitionInterval: { type: String, enums: ["none","daily", "weekly", "monthly"] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reminder", schema);
