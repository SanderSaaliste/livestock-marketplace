const fs = require('fs');

const transporter = require('./emailConfig');

const sendResetPasswordEmail = async (email, token) => {
  const emailSubect = 'Reset Your Password – Resolut Technologies';
  const emailRecipient = email;

  let emailTemplate;

  const template = fs.readFileSync(
    './emailTemplates/resetPassword.html',
    'utf-8'
  );

  emailTemplate = template
    .replace('{{Logo URL}}', `${process.env.BACKEND_URL}/assets/logo.png`)
    .replace(
      '{{Reset Password Link}}',
      `${process.env.FRONTEND_URL}/reset-password?token=${token}`
    );

  const mailOptions = {
    to: emailRecipient,
    subject: emailSubect,
    html: emailTemplate,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Error occurred while sending the email: ${error}`);
    } else {
      console.log('Email sent successfully!');
    }
  });
};

module.exports = {
  sendResetPasswordEmail,
};
