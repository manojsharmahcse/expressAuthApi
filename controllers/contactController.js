import Contact from "../models/contactModel.js";

export const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      phone,
      message,
      resume: req.files ? req.files.map((file) => file.path) : [],
    });

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};