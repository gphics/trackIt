const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enums: ["mail", "female"],
      required: true,
    },
    notificationSubscriptions: {
      type: Array,
    },

    isActive: {
      type: Boolean,
      required: true,
    },

    dual_factor_auth: {
      state: {
        type: Boolean,
        default: false,
      },
      passcode: {
        type: Number,
      },
    },
    contact: {
      type: Number,
    },
    location: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    totalDebtCount: {
      to_be_paid: { type: Number, default: 0 },
      to_be_collected: { type: Number, default: 0 },
    },
    totalDebtAmount: {
      repayment: {
        type: Number,
        default: 0,
      },
      non_repayment: {
        type: Number,
        default: 0,
      },
    },
    avatar: {
      url: {
        type: String,
        default:
          "https://th.bing.com/th/id/OIP.vCNr3UL_DV6WByU6q5bS9AHaHa?w=179&h=180&c=7&r=0&o=5&pid=1.7",
      },
      public_id: String,
    },
    Debts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Debt" }],
    Reminders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reminder" }],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
