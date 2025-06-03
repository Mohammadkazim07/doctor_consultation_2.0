const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Middleware
app.use(cors({
  origin: 'https://drmohammadaamir.netlify.app',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(bodyParser.json());

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'chestkidneycarecentre@gmail.com', // Your email
    pass: 'gnle lgyv kaob zgpo',  // App password (not your Gmail password)
  },
});

// ✅ Route 1: Handle general appointment booking form
app.post('/api/appointments', async (req, res) => {
  const { PatientName, age, gender, address, phone, email, appointmentDate } = req.body;

  const doctorMailOptions = {
    from: 'chestkidneycarecentre@gmail.com',
    to: 'mohammadaamir486@gmail.com', // Doctor's email
    subject: 'New Appointment Booking',
    text: `New appointment booking:\n\nFull Name: ${PatientName}\nAge: ${age}\nGender: ${gender}\nAddress: ${address}\nPhone: ${phone}\nEmail: ${email}\nAppointment Date: ${appointmentDate}`,
  };

  try {
    // Email to doctor
    const doctorInfo = await transporter.sendMail(doctorMailOptions);
    console.log('Email sent to doctor:', doctorInfo.response);

    // Confirmation email to user
    const userMailOptions = {
      from: 'chestkidneycarecentre@gmail.com',
      to: email,
      subject: 'Appointment Confirmation',
      text: `Hello ${PatientName},\n\nYour appointment is confirmed for ${appointmentDate}.\n\nThank you for booking with us!`,
    };

    await transporter.sendMail(userMailOptions);
    console.log('Confirmation email sent to user:', email);

    res.status(200).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to notify doctor or user.' });
  }
});

// ✅ Route 2: Handle service-based appointment modal form
app.post('/api/book-appointment', async (req, res) => {
  const { name, email, phone, date, symptoms, title } = req.body;

  const doctorMailOptions = {
    from: 'chestkidneycarecentre@gmail.com',
    to: 'mohammadaamir486@gmail.com', // Doctor's email
    subject: `New ${title} Appointment Request`,
    text: `You have a new appointment request for ${title}.\n\nPatient Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred Date: ${date}\nSymptoms: ${symptoms}`,
  };

  try {
    await transporter.sendMail(doctorMailOptions);
    console.log('New service appointment email sent to doctor.');

    // Confirmation email to user
    await transporter.sendMail({
      from: 'chestkidneycarecentre@gmail.com',
      to: email,
      subject: `Appointment Request Received - ${title}`,
      text: `Hello ${name},\n\nYour request for a ${title} appointment on ${date} has been received. Our team will contact you soon.\n\nThank you!`,
    });

    res.status(200).json({ message: 'Appointment request sent successfully' });
  } catch (error) {
    console.error('Error sending service appointment email:', error);
    res.status(500).json({ error: 'Failed to send appointment request' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
