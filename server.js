//Imports ---declarations
const express = require("express");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const xss = require("xss-clean");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
require("express-async-errors"); //Replaces user defined try catch errors in controllers.
require("dotenv").config();
const connectDb = require("./db/dbConfig");
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI;
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const authRoute = require("./routes/authRoute");


const app = express();
// Middlewares
app.use(express.json());
const morgan = require("morgan");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 60,
    max: 60,
  })
);
app.use(xss());
app.use(mongoSanitize());
app.use(helmet());

// Routes
app.use("/api/v1/auth", authRoute);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDb(MONGODB_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
