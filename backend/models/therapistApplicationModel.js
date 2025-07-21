import mongoose from "mongoose";

const therapistApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    speciality: { type: String },
    degree: { type: String },
    experience: { type: String },
    about: { type: String },
    fees: { type: Number },
    address: { type: Object },
    status: { type: String, default: "pending" },
    date: { type: Number, default: Date.now },
  },
  { minimize: false }
);

const therapistApplicationModel =
  mongoose.models.therapistApplication ||
  mongoose.model("therapistApplication", therapistApplicationSchema);

export default therapistApplicationModel;
