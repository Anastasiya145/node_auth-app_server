const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
require("dotenv/config");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL } =
  process.env;

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_REDIRECT_URL,
      scope: ["email", "profile"], // Ask profile and email
    },
    function (accessToken, refreshToken, profile, cb, done) {
      console.log("accessToken", accessToken, profile);
      console.log("profile", profile);
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
