"use strict";

require("dotenv/config");
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json");
const ApiError = require("./exceptions/ApiError");

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(
  authRouter
  // #swagger.tags = ['Auths']
);
app.use(
  userRouter
  // #swagger.tags = ['Users']
);
app.use(errorMiddleware);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.get("/", (req, res) => res.send("Server was published on Vercel"));

// for all other pages
app.use((req, res, next) => {
  next(ApiError.NotFound());
});

module.exports = app;
