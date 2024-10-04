// called passport of form local
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// model collection database
const { Users } = require("../models");
const bcrypt = require("./bcrypt.js");

// validation of data for signin
passport.use("local", new LocalStrategy({
      usernameField: "user",
      passwordField: "password",
      passReqToCallback: true,
    }, async (req, user, password, done) => {
      const userQuery = await Users.findOne({ user: user });
      if (userQuery) {
        if (password.length < 8) {
            return done(null, false, req.flash("message", "Contraseña esta muy corta"));
        } else {
          const passwordQuery = await bcrypt.matchPassword(password, userQuery.password);
          if (passwordQuery) {
            return done(null, userQuery, req.flash("success", "Bienvenido..."));
          } else {
            return done(null, false, req.flash("message", "Contraseña Invalida"));
          }
        }
      } else {
        return done(null, false, req.flash("message", "El usuario no existe"));
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await Users.findById({ _id: id });
  done(null, user);
});
