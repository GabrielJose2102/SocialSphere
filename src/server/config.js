const express = require("express");
const path = require("path");
require("dotenv").config(); 
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require('passport');

// call connect to database
require('../helpers/passport.js');

module.exports = (app) => {
  // setting server
  app.set("port", process.env.PORT || 3000);
  app.set("views", path.join(__dirname, "../views"));
  // template configuration
  app.engine(".hbs", exphbs({
      defaultLayout: "main",
      layoutsDir: path.join(app.get("views"), "layouts"),
      partialsDir: path.join(app.get("views"), "partials"),
      extname: ".hbs",
      helpers: require("../helpers"),
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      },
    }));
  app.set("view engine", ".hbs");

  // middleware
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  // session configuration
  app.use(
    session({
      secret: "SocialSphere",
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: process.env.database_URI,
      }),
    })
  );
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  // global variables
  app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
  });

  // routes servers
  app.use(require("../routes"));
  app.use(require('../routes/main.js'));

  // static file
  app.use("/public", express.static(path.join(__dirname, "../public")));

  return app;
};
