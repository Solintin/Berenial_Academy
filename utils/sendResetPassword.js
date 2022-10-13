


const sendMail = require("./sendEmail");

const sendResetPassword = ({ email, name, resetpasswordToken }) => {
  return sendMail({
    to: email,
    subject: "Reset Password",
    template: "reset_password",
    context: {
      email,
      name,
      resetpasswordToken,
    },
  });
};

module.exports = sendResetPassword;
