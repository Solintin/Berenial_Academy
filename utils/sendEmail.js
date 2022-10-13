const nodemailer = require("nodemailer");
const config = require("./nodemailer.config");
const sendEmail = async ({ to, subject, template, context }) => {
  const hbs = require("nodemailer-express-handlebars");
  const path = require("path");
  const transporter = nodemailer.createTransport(config);

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      pathDir: path.resolve("./views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));
  return transporter.sendMail(
    {
      from: '"foodblogafrika<hello@foodblogafrika>', // sender address
      to, // list of receivers
      subject, // Subject line
      template,
      context,
    },
    (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(`Message sent to ${to} successfully`);
    }
  );
};

module.exports = sendEmail;
