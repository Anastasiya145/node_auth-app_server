"use strict";

require("dotenv/config");
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const googleAuthRouter = require("./routes/google-auth.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json");
const ApiError = require("./exceptions/ApiError");
const passport = require("passport");

require("./strategies/google");

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(errorMiddleware);

app.use(passport.initialize());

// Routes
app.get("/", (req, res) => res.send("Server was published on Vercel"));
app.use(
  authRouter
  // #swagger.tags = ['Auths']
);
app.use(
  userRouter
  // #swagger.tags = ['Users']
);
app.use(
  googleAuthRouter
  // #swagger.tags = ['Google Auths']
);

// Swagger setup
const CSS_SWAGGER_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: CSS_SWAGGER_URL,
  })
);

app.use((req, res, next) => {
  next(ApiError.NotFound());
}); // for all other pages

module.exports = app;
