const sendMail = require("./sendEmail");

const sendVerificationMail = ({ email, name, verificationToken }) => {
  return sendMail({
    to: email,
    subject: "Email verification",
    template: "email_verification",
    context: {
      email,
      name,
      verificationToken,
    },
  });
};

module.exports = sendVerificationMail;
