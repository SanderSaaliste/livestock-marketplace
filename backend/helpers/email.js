const fs = require('fs');

const transporter = require('./emailConfig');

const sendVerifyEmail = async (email, token) => {
  const emailSubect = 'Verify Your Email – Farmify';
  const emailRecipient = email;

  let emailTemplate;

  const template = fs.readFileSync(
    './emailTemplates/verifyEmail.html',
    'utf-8'
  );

  emailTemplate = template
    .replace(
      '{{Logo URL}}',
      `${process.env.BACKEND_URL}/assets/farmifyLogo.png`
    )
    .replace(
      '{{Verification Link}}',
      `${process.env.FRONTEND_URL}/emailVerified?token=${token}`
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
  sendVerifyEmail,
};
