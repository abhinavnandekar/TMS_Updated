const bcrypt = require('bcrypt');
const db = require('../db');
const jwtUtils = require('../token/jwtUtils');
// const CircularJSON = require('circular-json');
// const secure = require('../token/secure');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
// const { logExecution } = require('../superadmin/SA');
const { v4: uuidv4 } = require('uuid');

encryptKey = "SenseLive-Tms-Dashboard";

// Function to send an email with the token

function sendTokenEmail(email, token, firstName, lastName) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'kpohekar19@gmail.com',
      pass: 'woptjevenzhqmrpp',
    },
  });

  // Generate a UUID for the email
  const emailId = uuidv4();

  // Log the start of the email sending process
  //logExecution('sendTokenEmail', emailId, 'INFO', 'Email sending process started');

  // Read the email template file
  const templatePath = path.join(__dirname, '../mail-body/email-template.ejs');
  fs.readFile(templatePath, 'utf8', (err, templateData) => {
    if (err) {
      console.error('Error reading email template:', err);
      // Log the error
      //logExecution('sendTokenEmail', emailId, 'ERROR', 'Error reading email template');
      return;
    }

    // Compile the email template with EJS
    const compiledTemplate = ejs.compile(templateData);

    // Render the template with the token and recipient's name
    const html = compiledTemplate({ token, firstName, lastName });

    const mailOptions = {
      from: 'your-email@example.com', // Replace with the sender's email address
      to: email,
      subject: 'Registration Token',
      html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        // Log the error
        //logExecution('sendTokenEmail', emailId, 'ERROR', 'Error sending email');
      } else {
        console.log('Email sent:', info.response);
        // Log the email sent success
        //logExecution('sendTokenEmail', emailId, 'SUCCESS', 'Email sent successfully');
      }
    });
  });
}


function sendTokenDashboardEmail(email, token) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'kpohekar19@gmail.com',
      pass: 'woptjevenzhqmrpp',
    },
  });

  // Generate a UUID for the email
  const emailId = uuidv4();

  // Log the start of the email sending process
  //logExecution('sendTokenDashboardEmail', emailId, 'INFO', 'Email sending process started');

  // Read the email template file
  const templatePath = path.join(__dirname, '../mail-body/email-template.ejs');
  fs.readFile(templatePath, 'utf8', (err, templateData) => {
    if (err) {
      console.error('Error reading email template:', err);
      // Log the error
      //logExecution('sendTokenDashboardEmail', emailId, 'ERROR', 'Error reading email template');
      return;
    }

    // Compile the email template with EJS
    const compiledTemplate = ejs.compile(templateData);

    // Render the template with the token
    const html = compiledTemplate({ token });

    const mailOptions = {
      from: 'your-email@example.com',
      to: email,
      subject: 'Registration Token',
      html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        // Log the error
        //logExecution('sendTokenDashboardEmail', emailId, 'ERROR', 'Error sending email');
      } else {
        console.log('Email sent:', info.response);
        // Log the email sent success
        //logExecution('sendTokenDashboardEmail', emailId, 'SUCCESS', 'Email sent successfully');
      }
    });
  });
}


function sendResetTokenEmail(personalEmail, resetToken) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'kpohekar19@gmail.com',
      pass: 'woptjevenzhqmrpp',
    },
  });

  // Generate a UUID for the email
  const emailId = uuidv4();

  // Log the start of the email sending process
  //logExecution('sendResetTokenEmail', emailId, 'INFO', 'Reset token email sending process started');

  // Read the email template file
  const templatePath = path.join(__dirname, '../mail-body/email-template-forgot-password.ejs');
  fs.readFile(templatePath, 'utf8', (err, templateData) => {
    if (err) {
      console.error('Error reading email template:', err);
      // Log the error
      //logExecution('sendResetTokenEmail', emailId, 'ERROR', 'Error reading email template');
      return;
    }

    // Compile the email template with EJS
    const compiledTemplate = ejs.compile(templateData);

    // Render the template with the resetToken
    const html = compiledTemplate({ resetToken });

    const mailOptions = {
      from: 'kpohekar19@gmail.com',
      to: personalEmail,
      subject: 'Reset Password Link',
      html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        // Log the error
        //logExecution('sendResetTokenEmail', emailId, 'ERROR', 'Error sending email');
      } else {
        console.log('Email sent:', info.response);
        // Log the email sent success
        //logExecution('sendResetTokenEmail', emailId, 'SUCCESS', 'Reset token email sent successfully');
      }
    });
  });
}

// Function to handle user registration


function register(req, res) {
  const {
    companyName,
    companyEmail,
    contact,
    location,
    firstName,
    lastName,
    personalEmail,
    designation,
    password,
  } = req.body;

  // Generate a UUID for tenant_id
  const tenantId = uuidv4();

  // Combine firstName and lastName to create the user's name
  const name = `${firstName} ${lastName}`;

  // Log the start of the registration process
  // logExecution('register', tenantId, 'INFO', 'Registration process started');

  // Check if the company email is already registered
  const emailCheckQuery = 'SELECT * FROM tms_users WHERE CompanyEmail = ?';
  db.query(emailCheckQuery, [companyEmail], (error, emailCheckResult) => {
    if (error) {
      console.error('Error during email check:', error);
      // Log the error
      // logExecution('register', tenantId, 'ERROR', 'Error during email check');
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (emailCheckResult.length > 0) {
      console.log('Company email already exists');
      // Log the error
      // logExecution('register', tenantId, 'ERROR', 'Company email already exists');
      return res.status(400).json({ message: 'Company email already exists' });
    }

    // Check if the username (company email) is already registered
    const personalEmailCheckQuery = 'SELECT * FROM tms_users WHERE PersonalEmail = ?';
    db.query(personalEmailCheckQuery, [personalEmail], (error, personalEmailCheckResult) => {
      if (error) {
        console.error('Error during username check:', error);
        // Log the error
        // logExecution('register', tenantId, 'ERROR', 'Error during username check');
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (personalEmailCheckResult.length > 0) {
        console.log('Username already exists');
        // Log the error
        // logExecution('register', tenantId, 'ERROR', 'Username already exists');
        return res.status(400).json({ message: 'User already exists' });
      }

      // Generate a unique 10-digit user ID
      const userId = generateUserId();

      // Hash the password
      bcrypt.hash(password, 10, (error, hashedPassword) => {
        if (error) {
          console.error('Error during password hashing:', error);
          // Log the error
          // logExecution('register', tenantId, 'ERROR', 'Error during password hashing');
          return res.status(500).json({ message: 'Internal server error' });
        }

        // Generate a verification token
        const verificationToken = jwtUtils.generateToken({ personalEmail: personalEmail });

        // Insert the user into the database
        const insertQuery =
          'INSERT INTO tms_users (UserId, Username, FirstName, LastName, CompanyName, CompanyEmail, ContactNo, Location, UserType, PersonalEmail, Password, Designation, VerificationToken, Verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(
          insertQuery,
          [
            userId,
            personalEmail,
            firstName,
            lastName,
            companyName,
            companyEmail,
            contact,
            location,
            'Admin',
            personalEmail,
            hashedPassword,
            designation,
            verificationToken,
            '0',
          ],
          (error, insertResult) => {
            if (error) {
              console.error('Error during user insertion:', error);
              // Log the error
              // logExecution('register', tenantId, 'ERROR', 'Error during user insertion');
              return res.status(500).json({ message: 'Internal server error' });
            }

            // Log the registration success
            // logExecution('register', tenantId, 'SUCCESS', 'User registered successfully');

            // Send the verification token to the user's email
            sendTokenEmail(personalEmail, verificationToken, firstName, lastName);

            console.log('User registered successfully');
            res.json({ message: 'Registration successful. Check your email for the verification token.' });
          }
        );
      });
    });
  });
}

function register_dashboard(req, res) {
  const {
    companyName,
    companyEmail,
    contact,
    location,
    firstName,
    lastName,
    personalEmail,
    designation,
    password,
  } = req.body;

  // Generate a UUID for tenant_id
  const tenantId = uuidv4();

  // Combine firstName and lastName to create the user's name
  const name = `${firstName} ${lastName}`;

  // Log the start of the registration process
  // logExecution('register_dashboard', tenantId, 'INFO', 'Registration process started');

  // Check if the username (company email) is already registered
    const personalEmailCheckQuery = 'SELECT * FROM tms_users WHERE PersonalEmail = ?';
    db.query(personalEmailCheckQuery, [personalEmail], (error, personalEmailCheckResult) => {
      if (error) {
        console.error('Error during username check:', error);
        // Log the error
        // logExecution('register_dashboard', tenantId, 'ERROR', 'Error during username check');
        return res.status(500).json({ message: 'Internal server error' });
      }

      try {
        if (personalEmailCheckResult.length > 0) {
          console.log('Username already exists');
          // Log the error
          // logExecution('register', tenantId, 'ERROR', 'Username already exists');
          return res.status(400).json({ message: 'User already exists' });
        }

        // Generate a unique 10-digit user ID
        const userId = generateUserId();

        // Hash the password
        bcrypt.hash(password, 10, (error, hashedPassword) => {
          if (error) {
            console.error('Error during password hashing:', error);
            // Log the error
            // logExecution('register_dashboard', tenantId, 'ERROR', 'Error during password hashing');
            return res.status(500).json({ message: 'Internal server error' });
          }

          try {
            // Generate a verification token
            const verificationToken = jwtUtils.generateToken({ personalEmail: personalEmail });

            // Insert the user into the database
            const insertQuery =
              'INSERT INTO tms_users (UserId, Username, FirstName, LastName, CompanyName, CompanyEmail, ContactNo, Location, UserType, PersonalEmail, Password, Designation, VerificationToken, Verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(
              insertQuery,
              [
                userId,
                personalEmail,
                firstName,
                lastName,
                companyName,
                companyEmail,
                contact,
                location,
                'Admin',
                personalEmail,
                hashedPassword,
                designation,
                verificationToken,
                '0',
              ],
              (error, insertResult) => {
                if (error) {
                  console.error('Error during user insertion:', error);
                  // Log the error
                  // logExecution('register_dashboard', tenantId, 'ERROR', 'Error during user insertion');
                  return res.status(500).json({ message: 'Internal server error' });
                }

                // Log the registration success
                // logExecution('register_dashboard', tenantId, 'SUCCESS', 'User registered successfully');

                try {
                  // Send the verification token to the user's email
                  sendTokenEmail(personalEmail, verificationToken, firstName, lastName);

                  console.log('User registered successfully');
                  res.json({ message: 'Registration successful. Check your email for the verification token.' });
                } catch (error) {
                  console.error('Error sending verification token:', error);
                  // Log the error
                  // logExecution('register_dashboard', tenantId, 'ERROR', 'Error sending verification token');
                  res.status(500).json({ message: 'Internal server error' });
                }
              }
            );
          } catch (error) {
            console.error('Error during registration:', error);
            // Log the error
            // logExecution('register_dashboard', tenantId, 'ERROR', 'Error during registration');
            res.status(500).json({ message: 'Internal server error' });
          }
        });
      } catch (error) {
        console.error('Error during registration:', error);
        // Log the error
        // logExecution('register_dashboard', tenantId, 'ERROR', 'Error during registration');
        res.status(500).json({ message: 'Internal server error' });
      }
    });
}

// Function to handle token verification

function verifyToken(req, res) {
  const { token } = req.body;

  // Generate a UUID for the token verification process
  const verificationId = uuidv4();

  // Log the start of the token verification process
  // logExecution('verifyToken', verificationId, 'INFO', 'Token verification process started');

  // Check if the token matches the one stored in the database
  const tokenCheckQuery = 'SELECT * FROM tms_users WHERE VerificationToken = ?';
  db.query(tokenCheckQuery, [token], (error, tokenCheckResult) => {
    if (error) {
      console.error('Error during token verification:', error);
      // Log the error
      // logExecution('verifyToken', verificationId, 'ERROR', 'Error during token verification');
      return res.status(500).json({ message: 'Internal server error' });
    }

    try {
      if (tokenCheckResult.length === 0) {
        console.log('Token verification failed');
        // Log the error
        // logExecution('verifyToken', verificationId, 'ERROR', 'Token verification failed');
        return res.status(400).json({ message: 'Token verification failed' });
      }

      // Token matches, update the user's status as verified
      const updateQuery = 'UPDATE tms_users SET Verified = ? WHERE VerificationToken = ?';
      db.query(updateQuery, [true, token], (error, updateResult) => {
        if (error) {
          console.error('Error updating user verification status:', error);
          // Log the error
          // logExecution('verifyToken', verificationId, 'ERROR', 'Error updating user verification status');
          return res.status(500).json({ message: 'Internal server error' });
        }

        console.log('Token verification successful');
        // Log the token verification success
        // logExecution('verifyToken', verificationId, 'SUCCESS', 'Token verification successful');
        res.json({ message: 'Token verification successful. You can now log in.' });
      });
    } catch (error) {
      console.error('Error during token verification:', error);
      // Log the error
      // logExecution('verifyToken', verificationId, 'ERROR', 'Error during token verification');
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}


// Function to resend the verification token

function resendToken(req, res) {
  const { personalEmail } = req.body;

  // Generate a UUID for the resend token process
  const resendId = uuidv4();

  // Log the start of the resend token process
  // logExecution('resendToken', resendId, 'INFO', 'Resend token process started');

  // Check if the user is available
  const checkUserQuery = 'SELECT * FROM tms_users WHERE PersonalEmail = ?';
  db.query(checkUserQuery, [personalEmail], (error, userResult) => {
    if (error) {
      console.error('Error checking user availability:', error);
      // Log the error
      // logExecution('resendToken', resendId, 'ERROR', 'Error checking user availability');
      return res.status(500).json({ message: 'Internal server error' });
    }

    // If no user found, send an error response
    if (userResult.length === 0) {
      // Log the user not found error
      // logExecution('resendToken', resendId, 'ERROR', 'User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // If user is already verified, send a bad request error response
    if (userResult[0].Verified === '1') {
      // Log the user already verified error
      // logExecution('resendToken', resendId, 'ERROR', 'User already verified');
      return res.status(400).json({ message: 'User already verified' });
    } else {
      // Generate a new verification token
      const verificationToken = jwtUtils.generateToken({ personalEmail: personalEmail });

      // Update the user's verification token in the database
      const updateQuery = 'UPDATE tms_users SET VerificationToken = ? WHERE PersonalEmail = ?';
      db.query(updateQuery, [verificationToken, personalEmail], (error, updateResult) => {
        if (error) {
          console.error('Error updating verification token:', error);
          // Log the error
          // logExecution('resendToken', resendId, 'ERROR', 'Error updating verification token');
          return res.status(500).json({ message: 'Internal server error' });
        }

        try {
          // Send the new verification token to the user's email
          sendTokenEmail(personalEmail, verificationToken);

          console.log('Verification token resent');
          // Log the resend success
          // logExecution('resendToken', resendId, 'SUCCESS', 'Verification token resent');
          res.json({ message: 'Verification token resent. Check your email for the new token.' });
        } catch (error) {
          console.error('Error sending verification token:', error);
          // Log the error
          // logExecution('resendToken', resendId, 'ERROR', 'Error sending verification token');
          res.status(500).json({ message: 'Internal server error' });
        }
      });
    }
  });
}


function login(req, res) {
  const { Username, Password } = req.body;

  // Generate a UUID for tenant_id
  const tenantId = uuidv4();

  // Log the start of the function execution
  // logExecution('login', tenantId, 'INFO', 'User login attempt');

  // Check if the user exists in the database
  const query = 'SELECT * FROM tms_users WHERE Username = ?';
  db.query(query, [Username], (error, rows) => {
    try {
      if (error) {
        console.error('Error during login:', error);
        // Log the error
        // logExecution('login', tenantId, 'ERROR', 'Error during login');
        throw new Error('Error during login');
      }

      if (rows.length === 0) {
        // Log the end of the function execution with an error message
        // logExecution('login', tenantId, 'ERROR', 'User does not exist');
        return res.status(401).json({ message: 'User does not exist!' });
      }

      const user = rows[0];

      if (user.Verified === '0') {
        // Log the end of the function execution with an error message
        // logExecution('login', tenantId, 'ERROR', 'User is not verified');
        return res.status(401).json({ message: 'User is not verified. Please verify your account.' });
      }

      if (user.block === 1) {
        // Log the end of the function execution with an error message
        // logExecution('login', tenantId, 'ERROR', 'User is blocked');
        return res.status(401).json({ message: 'User is blocked. Please contact support.' });
      }

      // Compare the provided password with the hashed password in the database
      bcrypt.compare(Password, user.Password, (error, isPasswordValid) => {
        try {
          if (error) {
            console.error('Error during password comparison:', error);
            // Log the error
            // logExecution('login', tenantId, 'ERROR', 'Error during password comparison');
            throw new Error('Error during password comparison');
          }

          if (!isPasswordValid) {
            // Log the end of the function execution with an error message
            // logExecution('login', tenantId, 'ERROR', 'Invalid credentials');
            return res.status(401).json({ message: 'Invalid credentials' });
          }

          // Generate a JWT token
          const token = jwtUtils.generateToken({ Username: user.Username });

          // Log the end of the function execution with a success message
          // logExecution('login', tenantId, 'INFO', 'User login successful');
          res.json({ token });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}



// User details endpoint

function getUserDetails(req, res) {
  const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header

  // Generate a UUID for the user details retrieval process
  const userDetailsId = uuidv4();

  // Log the start of the user details retrieval process
  // logExecution('getUserDetails', userDetailsId, 'INFO', 'User details retrieval process started');

  // Verify the token
  const decodedToken = jwtUtils.verifyToken(token);
  if (!decodedToken) {
    // Log the invalid token error
    // logExecution('getUserDetails', userDetailsId, 'ERROR', 'Invalid token');
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Fetch user details from the database using the decoded token information
  const query = 'SELECT * FROM tms_users WHERE Username = ?';
  db.query(query, [decodedToken.Username], (error, rows) => {
    if (error) {
      console.error(error);
      // Log the database query error
      // logExecution('getUserDetails', userDetailsId, 'ERROR', 'Database query error');
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (rows.length === 0) {
      // Log the user not found error
      // logExecution('getUserDetails', userDetailsId, 'ERROR', 'User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];
    // Log the user details retrieval success
    // logExecution('getUserDetails', userDetailsId, 'SUCCESS', 'User details retrieval successful');
    res.json(user);
  });
}


// Forgot password

function forgotPassword(req, res) {
  const { personalEmail } = req.body;

  // Generate a UUID for the forgot password process
  const forgotPasswordId = uuidv4();

  // Log the start of the forgot password process
  // logExecution('forgotPassword', forgotPasswordId, 'INFO', 'Forgot password process started');

  // Check if the email exists in the database
  const query = 'SELECT * FROM tms_users WHERE PersonalEmail = ?';
  db.query(query, [personalEmail], (error, rows) => {
    try {
      if (error) {
        throw new Error('Error during forgot password');
      }

      if (rows.length === 0) {
        // Log the user not found error
        // logExecution('forgotPassword', forgotPasswordId, 'ERROR', 'User not found');
        return res.status(404).json({ message: 'User not found' });
      }

      // Generate a reset token
      const resetToken = jwtUtils.generateToken({ personalEmail: personalEmail });

      // Save the reset token in the database
      const userId = rows[0].UserId;
      const insertQuery = 'INSERT INTO tms_reset_tokens (UserId, token) VALUES (?, ?)';
      db.query(insertQuery, [userId, resetToken], (error, insertResult) => {
        try {
          if (error) {
            throw new Error('Error saving reset token');
          }

          // Send the reset token to the user's email
          sendResetTokenEmail(personalEmail, resetToken);

          // Log the reset token sent
          // logExecution('forgotPassword', forgotPasswordId, 'SUCCESS', 'Reset token sent to email');
          res.json({ message: 'Reset token sent to your email' });
        } catch (error) {
          console.error(error);
          // Log the error
          // logExecution('forgotPassword', forgotPasswordId, 'ERROR', 'Error sending reset token');
          res.status(500).json({ message: 'Internal server error' });
        }
      });
    } catch (error) {
      console.error(error);
      // Log the error
      // logExecution('forgotPassword', forgotPasswordId, 'ERROR', 'Error during forgot password');
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}


function resendResetToken(req, res) {
  const { personalEmail } = req.body;

  // Generate a UUID for the resend reset token process
  const resendResetTokenId = uuidv4();

  // Log the start of the resend reset token process
  // logExecution('resendResetToken', resendResetTokenId, 'INFO', 'Resend reset token process started');

  // Check if the user is available
  const checkUserQuery = 'SELECT * FROM tms_users WHERE PersonalEmail = ?';
  db.query(checkUserQuery, [personalEmail], (error, userResult) => {
    if (error) {
      console.error('Error checking user availability:', error);
      // Log the error
      // logExecution('resendResetToken', resendResetTokenId, 'ERROR', 'Error checking user availability');
      return res.status(500).json({ message: 'Internal server error' });
    }

    // If no user found, send an error response
    if (userResult.length === 0) {
      // Log the user not found error
      // logExecution('resendResetToken', resendResetTokenId, 'ERROR', 'User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a new verification token
    const userId = userResult[0].UserId;
    const verificationToken = jwtUtils.generateToken({ personalEmail: personalEmail });

    // Update the user's verification token in the database
    const updateQuery = 'UPDATE tms_reset_tokens SET token = ? WHERE UserId = ?';
    db.query(updateQuery, [verificationToken, userId], (error, updateResult) => {
      if (error) {
        console.error('Error updating Resend link:', error);
        // Log the error
        // logExecution('resendResetToken', resendResetTokenId, 'ERROR', 'Error updating Resend link');
        return res.status(500).json({ message: 'Internal server error' });
      }

      try {
        // Send the new verification token to the user's email
        sendResetTokenEmail(personalEmail, verificationToken);

        console.log('Resend link resent');
        // Log the resend success
        // logExecution('resendResetToken', resendResetTokenId, 'SUCCESS', 'Resend reset token resent');
        res.json({ message: 'Resend link resent. Check your email for the new token.' });
      } catch (error) {
        console.error('Error sending verification token:', error);
        // Log the error
        // logExecution('resendResetToken', resendResetTokenId, 'ERROR', 'Error sending verification token');
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  });
}


function resetPassword(req, res) {
  const { token, password } = req.body;

  // Generate a UUID for the reset password process
  const resetPasswordId = uuidv4();

  // Log the start of the reset password process
  // logExecution('resetPassword', resetPasswordId, 'INFO', 'Reset password process started');

  // Check if the email and reset token match in the database
  const query = 'SELECT * FROM tms_reset_tokens WHERE token = ?';
  db.query(query, [token], (error, rows) => {
    try {
      if (error) {
        throw new Error('Error during reset password');
      }

      if (rows.length === 0) {
        // Log the invalid token error
        // logExecution('resetPassword', resetPasswordId, 'ERROR', 'Invalid token');
        return res.status(401).json({ message: 'Invalid token' });
      }

      const userId = rows[0].UserId;

      // Hash the new password
      bcrypt.hash(password, 10, (error, hashedPassword) => {
        try {
          if (error) {
            throw new Error('Error during password hashing');
          }

          // Update the password in the database
          const updateQuery = 'UPDATE tms_users SET Password = ? WHERE UserId = ?';
          db.query(updateQuery, [hashedPassword, userId], (error, updateResult) => {
            try {
              if (error) {
                throw new Error('Error updating password');
              }

              // Delete the reset token from the reset_tokens table
              const deleteQuery = 'DELETE FROM tms_reset_tokens WHERE token = ?';
              db.query(deleteQuery, [token], (error, deleteResult) => {
                if (error) {
                  console.error('Error deleting reset token:', error);
                }

                // Log the password reset success
                // logExecution('resetPassword', resetPasswordId, 'SUCCESS', 'Password reset successful');
                res.json({ message: 'Password reset successful' });
              });
            } catch (error) {
              console.error(error);
              // Log the error
              // logExecution('resetPassword', resetPasswordId, 'ERROR', 'Error updating password');
              res.status(500).json({ message: 'Internal server error' });
            }
          });
        } catch (error) {
          console.error(error);
          // Log the error
          // logExecution('resetPassword', resetPasswordId, 'ERROR', 'Error during password hashing');
          res.status(500).json({ message: 'Internal server error' });
        }
      });
    } catch (error) {
      console.error(error);
      // Log the error
      // logExecution('resetPassword', resetPasswordId, 'ERROR', 'Error during reset password');
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}


function setUserOnline(req, res) {
  const UserId = req.params.UserId;

  // Generate a UUID for the set user online process
  const setUserOnlineId = uuidv4();

  // Log the start of the set user online process
  // logExecution('setUserOnline', setUserOnlineId, 'INFO', 'Set user online process started');

  const userCheckQuery = 'SELECT * FROM tms_users WHERE UserID = ?';

  db.query(userCheckQuery, [UserId], (error, userCheckResult) => {
    try {
      if (error) {
        throw new Error('Error during device check');
      }

      if (userCheckResult.length === 0) {
        // Log the user not found error
        // logExecution('setUserOnline', setUserOnlineId, 'ERROR', 'User not found');
        return res.status(400).json({ message: 'User not found!' });
      }

      const onlineQuery = 'UPDATE tms_users SET is_online = ? WHERE UserID = ?';

      db.query(onlineQuery, ['1', UserId], (error, users) => {
        try {
          if (error) {
            throw new Error('Error updating user online status');
          }

          // Log the status update success
          // logExecution('setUserOnline', setUserOnlineId, 'SUCCESS', 'User online status updated successfully');
          res.json({ message: 'Status Updated Successfully' });
        } catch (error) {
          console.error(error);
          // Log the error
          // logExecution('setUserOnline', setUserOnlineId, 'ERROR', 'Error updating user online status');
          res.status(500).json({ message: 'Internal server error' });
        }
      });
    } catch (error) {
      console.error(error);
      // Log the error
      // logExecution('setUserOnline', setUserOnlineId, 'ERROR', 'Error during device check');
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}


function setUserOffline(req, res) {
  const UserId = req.params.UserId;

  // Generate a UUID for the set user offline process
  const setUserOfflineId = uuidv4();

  // Log the start of the set user offline process
  // logExecution('setUserOffline', setUserOfflineId, 'INFO', 'Set user offline process started');

  const userCheckQuery = 'SELECT * FROM tms_users WHERE UserID = ?';

  db.query(userCheckQuery, [UserId], (error, userCheckResult) => {
    try {
      if (error) {
        throw new Error('Error during device check');
      }

      if (userCheckResult.length === 0) {
        // Log the user not found error
        // logExecution('setUserOffline', setUserOfflineId, 'ERROR', 'User not found');
        return res.status(400).json({ message: 'User not found!' });
      }

      const onlineQuery = 'UPDATE tms_users SET is_online = ? WHERE UserID = ?';

      db.query(onlineQuery, ['0', UserId], (error, users) => {
        try {
          if (error) {
            throw new Error('Error updating user offline status');
          }

          // Log the status update success
          // logExecution('setUserOffline', setUserOfflineId, 'SUCCESS', 'User offline status updated successfully');
          res.json({ message: 'Status Updated Successfully' });
        } catch (error) {
          console.error(error);
          // Log the error
          // logExecution('setUserOffline', setUserOfflineId, 'ERROR', 'Error updating user offline status');
          res.status(500).json({ message: 'Internal server error' });
        }
      });
    } catch (error) {
      console.error(error);
      // Log the error
      // logExecution('setUserOffline', setUserOfflineId, 'ERROR', 'Error during device check');
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}


// Helper function to generate a unique 10-digit user ID
function generateUserId() {
  const userIdLength = 10;
  let userId = '';

  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < userIdLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    userId += characters.charAt(randomIndex);
  }

  return userId;
}


function Block(req, res) {
  const { UserId } = req.params;
  const { action } = req.body;

  // Generate a UUID for the block/unblock process
  const blockId = uuidv4();

  // Log the start of the block/unblock process
  // logExecution('Block', blockId, 'INFO', `User ${action} process started for UserId: ${UserId}`);

  if (action !== 'block' && action !== 'unblock') {
    // Log the invalid action error
    // logExecution('Block', blockId, 'ERROR', 'Invalid action. Use "block" or "unblock".');
    return res.status(400).json({ message: 'Invalid action. Use "block" or "unblock".' });
  }

  const blockValue = action === 'block' ? 1 : 0;

  // Check if the user is already blocked or unblocked
  const checkQuery = 'SELECT block FROM tms_users WHERE UserId = ?';

  db.query(checkQuery, [UserId], (checkError, checkResult) => {
    if (checkError) {
      console.error(`Error checking user block status:`, checkError);
      // Log the error
      // logExecution('Block', blockId, 'ERROR', 'Error checking user block status');
      return res.status(500).json({ message: 'Error checking user block status' });
    }

    if (checkResult.length === 0) {
      // Log the user not found error
      // logExecution('Block', blockId, 'ERROR', 'User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const currentBlockStatus = checkResult[0].block;

    if (currentBlockStatus === blockValue) {
      const statusMessage = blockValue === 1 ? 'already blocked' : 'already unblocked';
      // Log the user already blocked/unblocked message
      // logExecution('Block', blockId, 'INFO', `User is ${statusMessage}`);
      return res.status(200).json({ message: `User is ${statusMessage}` });
    }

    // User is not in the desired block state; update the block status
    const updateQuery = 'UPDATE tms_users SET block = ? WHERE UserId = ?';

    db.query(updateQuery, [blockValue, UserId], (updateError, updateResult) => {
      if (updateError) {
        console.error(`Error during user ${action}ing:`, updateError);
        // Log the error
        // logExecution('Block', blockId, 'ERROR', `Error ${action}ing user`);
        return res.status(500).json({ message: `Error ${action}ing user` });
      }

      if (updateResult.affectedRows === 0) {
        // Log the user not found error
        // logExecution('Block', blockId, 'ERROR', 'User not found');
        return res.status(404).json({ message: 'User not found' });
      }

      const successMessage = `User ${action}ed successfully`;
      // Log the success message
      // logExecution('Block', blockId, 'SUCCESS', successMessage);
      res.status(200).json({ message: successMessage });
    });
  });
}




module.exports = {
  register,
  register_dashboard,
  sendTokenEmail,
  sendTokenDashboardEmail,
  sendResetTokenEmail,
  verifyToken,
  resendToken,
  login,
  getUserDetails,
  forgotPassword,
  resendResetToken,
  resetPassword,
  setUserOnline,
  setUserOffline,
  Block
};