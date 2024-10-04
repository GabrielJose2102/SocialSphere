const { Users } = require("../models");
const { bcrypt, nodemailer } = require("../helpers");
const passport = require("passport");
const crypto = require("crypto");

const ctrl = {};

// signin render
ctrl.signin = (req, res) => {
  res.render("index.hbs");
};
// signin authentication
ctrl.login = passport.authenticate("local", {
  successRedirect: "/main",
  failureRedirect: "/",
  failureFlash: true,
});

// signup render
ctrl.signup = (req, res) => {
  res.render("signup.hbs");
};
// signup register
ctrl.register = async (req, res) => {
  const password = req.body.password;
  const user = await Users.find({
    $or: [{ user: req.body.user }, { email: req.body.email }],
  });

  if (user.length > 0) {
    req.flash("message", "El usuario ya se encuentra registrado");
    res.redirect("/signup");
  } else {
    const encrypt = await bcrypt.encryptPassword(password);

    if (password.length < 8) {
      req.flash("message", "La contraseña debe contener 8 caracteres minimo");
      res.redirect("/signup");
    } else {
      if (password === req.body.password2) {
        req.body.password = encrypt;
        const user = await new Users(req.body);
        user.save();
        req.flash("success", "Usuario registrado con exito");
        res.redirect("/");
      } else {
        req.flash("message", "La contraseña no coincide");
        res.redirect("/signup");
      }
    }
  }
};

// recover render
ctrl.recover = (req, res) => {
  res.render("recoverPass.hbs");
};
// recover mail sending
ctrl.recoverPassword = async (req, res) => {
  const email = req.body.email;
  const user = await Users.findOne({ email: email });

  if (user) {
    const mail = user.email;
    const token = crypto.randomBytes(16).toString("hex");
    const url = `http://localhost:3000/reset/${email}/${token}`;

    const message = `Para restablecer la contraseña haz click aqui: ${url}`;

    await nodemailer.sendMail(mail, message);

    //revisar por que no agrega los datos
    user.passwordToken = token;
    user.passwordExprire = Date.now() + 600000;
    const query = await user.save();

    req.headers.email = email;
    req.flash("success", "Codigo enviado exitosamente");
    res.redirect("/");
  } else {
    req.flash("message", "Correo no registrado");
    res.redirect("/recover");
  }
};

// reset render
ctrl.reset = async (req, res) => {
  const passwordToken = req.params.token;
  const email = req.params.email;
  const user = await Users.findOne({
    passwordToken,
    passwordExprire: { $gt: Date.now() },
  });

  if (user) {
    res.render("resetPass.hbs", { email });
  } else {
    req.flash("message", "El codigo de recuperacion ha expirado");
    res.redirect("/recover");
  }
};
// reset modify
ctrl.resetPassword = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await Users.findOne({ email });
    const password = req.body.password;
    const passwordConfir = req.body.password2;

    const encrypt = await bcrypt.encryptPassword(password);
    const compare = password === passwordConfir;

    console.log(password)
    console.log(password.length)

    if (password.length < 8) {
      req.flash("message", "La contraseña debe de tener minimo 8 caracteres");
      res.redirect(`${req.headers.referer}`);
    } else {
      if (compare) {
        user.password = encrypt;
        await user.save();
        req.flash("success", "Su contraseña ha sido restablecida exitosamente");
        res.redirect("/");
      } else {
        req.flash("message", "Los campos no coinciden");
        res.redirect(`${req.headers.referer}`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// logout
ctrl.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return console.log("error");
    }
    res.redirect("/");
  });
};

module.exports = ctrl;
