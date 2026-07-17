import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: [
        "admin",
        "manager",
        "employee",
      ],
      default: "employee",
    },

    department: String,

    phone: String,

    avatar: String,
    notificationSettings:{
  email:{
    type:Boolean,
    default:true
  },

  task:{
    type:Boolean,
    default:true
  },

  project:{
    type:Boolean,
    default:true
  }
},

resetPasswordToken: String,

resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model(
  "User",
  userSchema
);

export default User;