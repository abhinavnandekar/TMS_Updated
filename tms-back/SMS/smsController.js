const twilio = require('twilio');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const accountSid = 'ACb8754fe2a8a8139f772c8681da354639';
const authToken = '42fdd26013e50a0b3c5495f3bd26825e';
const twilioPhoneNumber = '+18148134128';
const twilioClient = twilio(accountSid, authToken);
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const previousDeviceStates = {};

function insertInfo(createdTime, type, subject, message, recipient, messageId) {
  const connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }

    const isRead = Math.random() < 0.5 ? 0 : 1;
    const timestamp = new Date().toISOString();

    const sql = 'INSERT INTO info_twi (created_time, type, subject, message, recipient, message_id, isRead) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    const values = [timestamp, type, subject, message, recipient, messageId, isRead];

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into the database:', err);
      } else {
        console.log('Data inserted into the database successfully.');
      }

      connection.end();
    });
  });
}

function checkState() {
  const connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }

    connection.query('SELECT EntryId, DeviceUID, DeviceName, SMS, email, status FROM tms_devices', (err, queryResults) => {
      if (err) {
        console.error('Error fetching data from the database:', err);
        connection.end();
        return;
      }

      //console.log('Database query result:', queryResults); // Log the query results

      const devices = queryResults;

      devices.forEach((device) => {
        const deviceId = device.EntryId;
        const previousState = previousDeviceStates[deviceId] || { status: 'unknown' };
        const currentState = {
          status: device.status,
        };

        if (previousState.status !== currentState.status) {
          previousDeviceStates[deviceId] = currentState;

          let message;
          if (currentState.status === 'online') {
            message = `${device.DeviceName} is online.`;
          } else if (currentState.status === 'offline') {
            message = `${device.DeviceName} is offline.`;
          } else if (currentState.status === 'heating') {
            message = `${device.DeviceName} is heating.`;
          } else {
            message = `${device.DeviceName} has an unknown status: ${currentState.status}`;
          }

          const emailContent = renderEmailTemplate([device]);
          sendSMS(device.SMS, message);
          sendEmail(device.email, emailContent, 'Device Status Update', message);
        }
      });

      connection.end();
    });
  });
}

function sendSMS(to, body) {
  const messageId = uuid.v4();
  try {
    if (!to) {
      throw new Error('Recipient phone number is missing.');
    }

    twilioClient.messages
      .create({
        body: body,
        to: to,
        from: twilioPhoneNumber,
      })
      .then(() => {
        console.log('SMS sent successfully:', body);
        insertInfo(new Date(), 'SMS', 'Device Status Update', body, to, messageId);
      })
      .catch((err) => {
        console.error('Error sending SMS:', err);
      });
  } catch (error) {
    console.error('Error sending SMS:', error.message);
  }
}

function sendEmail(to, body, subject, message) {
  const messageId = uuid.v4();
  const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'donotreplysenselive@gmail.com',
      pass: 'qpcaneirrhrhqspt',
    },
  });

  const mailOptions = {
    from: 'your_email_address',
    to: to,
    subject: subject,
    html: body,
  };

  emailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
      insertInfo(new Date(), 'Email', subject, message, to, messageId);
    }
  });
}

function renderEmailTemplate(devices) {
  const templateFilePath = path.join(__dirname, './views/device-status.ejs');
  const template = fs.readFileSync(templateFilePath, 'utf-8');

  return ejs.render(template, { devices });
}

// setInterval(checkState, 1000);

module.exports = { checkState, renderEmailTemplate };
