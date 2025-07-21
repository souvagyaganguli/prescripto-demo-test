import validator from "validator";
import bcrypt from "bcrypt";
import therapistApplicationModel from "../models/therapistApplicationModel.js";
import doctorModel from "../models/doctorModel.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const applyTherapist = async (req, res) => {
  try {
    const { name, email, phone, speciality, degree, experience, about, fees, address } = req.body;

    if (!name || !email) {
      return res.json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    const application = new therapistApplicationModel({
      name,
      email,
      phone,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      date: Date.now(),
    });

    await application.save();

    await transporter.sendMail({
      to: email,
      from: process.env.MAIL_FROM,
      subject: "Application Received",
      text: "Your therapist application has been received and is pending review.",
    });

    res.json({ success: true, message: "Application Submitted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const approveTherapist = async (req, res) => {
  try {
    const { applicationId, approve } = req.body;
    const application = await therapistApplicationModel.findById(applicationId);

    if (!application) {
      return res.json({ success: false, message: "Application not found" });
    }

    if (approve) {
      const password = Math.random().toString(36).slice(-8);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const doctorData = {
        name: application.name,
        email: application.email,
        password: hashedPassword,
        image: application.image || "", // image could be uploaded later
        speciality: application.speciality,
        degree: application.degree,
        experience: application.experience,
        about: application.about,
        fees: application.fees || 0,
        address: application.address || {},
        date: Date.now(),
        wallet: 0,
        payouts: [],
      };

      const newDoctor = new doctorModel(doctorData);
      await newDoctor.save();
      application.status = "approved";
      await application.save();

      await transporter.sendMail({
        to: application.email,
        from: process.env.MAIL_FROM,
        subject: "Application Approved",
        text: `Your application has been approved. Login email: ${application.email} Password: ${password}`,
      });
    } else {
      application.status = "rejected";
      await application.save();
      await transporter.sendMail({
        to: application.email,
        from: process.env.MAIL_FROM,
        subject: "Application Rejected",
        text: "Your therapist application has been rejected.",
      });
    }

    res.json({ success: true, message: "Action completed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { applyTherapist, approveTherapist };
