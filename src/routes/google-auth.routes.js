const express = require("express");
const passport = require("passport");

const googleAuthRouter = new express.Router();

googleAuthRouter.post(
  "/google/registration",
  passport.authenticate("google"),
  (req, res) => res.send("to do")
  // #swagger.description = 'Register a new user with google auth.'
);

googleAuthRouter.post(
  "/google/login",
  passport.authenticate("google"),
  (req, res) => res.send("to do")
  // #swagger.description = 'Sign-in with your google account'
);

module.exports = googleAuthRouter;
