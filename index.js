import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.options('*', cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ahmed.radiantcortex@gmail.com',
    pass: 'mreljejirzhndetb',
  },
});

app.get('/', (req, res) => {
  res.send("Server Start Successfully!!!");
});

app.post('/api/messages', (req, res) => {
  const { name, email, phone , date, message } = req.body;
  console.log(name);
  console.log(email);
  console.log(phone);
  console.log(date);
  console.log(message);

  // Validate input
  if (!name || !email || !phone || !date || !message) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  const mailOptions = {
    from: 'ahmed.radiantcortex@gmail.com',
    to: 'contact@amzvistas.com', // Replace with the recipient's email
    subject: 'Your Exclusive Invitation Inside',
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
            }

            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            h1 {
              color: #007BFF;
            }

            p {
              line-height: 1.6;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Contact Client</h1>

            <h2>Contact Information:</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        </body>
      </html>
    `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).send(error.toString());
    }

    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Message successfully sent.' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
