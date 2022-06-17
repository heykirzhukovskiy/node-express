const { Router } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const router = Router();

router.get("/", (req, res) => {
  res.render("auth", {
    title: "Authorization",
    isAuth: true,
    error: req.flash("error"),
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const candidate = await User.findOne({ email });

    if (!candidate) {
      req.flash("error", "User not found");
      res.redirect("/auth#login");
    } else {
      const isMatch = await bcrypt.compare(password, candidate.password);

      if (isMatch) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save((e) => {
          if (e) {
            throw e;
          }

          res.redirect("/");
        });
      } else {
        req.flash("error", "Wrong password");
        res.redirect("/auth#login");
      }
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/logout", async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
      req.flash("error", "User with such email already exists");
      res.redirect("/auth#register");
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword, name });
      await user.save();
      res.redirect("/auth#login");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
