import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "Not Started",
        "In Progress",
        "Completed",
        "On Hold",
      ],
      default: "Not Started",
    },

    startDate: Date,

    endDate: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Project",
  projectSchema
);