const mongoose = require("mongoose");

const debtSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    debtInfo: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enums: ["to_be_collected", "to_be_paid"],
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    isUpdated: {
      type: Boolean,
      default: false,
    },
    debtorInfo: {
      name: String,
      contact: Number,
      location: String,
    },
    creditorInfo: {
      name: String,
      contact: Number,
      location: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    incurredDate: {
      type: Date,
      default: null,
    },

    deadline: {
      type: Date,
      default: null,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const DebtModel = mongoose.model("Debt", debtSchema);

module.exports = DebtModel;
