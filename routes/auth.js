const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/", (_req, res) => {
  res.render("auth/auth", {
    title: "Authorization",
    isAuth: true,
  });
});

router.get("/login", async (req, res) => {
  try {
    const user = await User.findById("626c8941cd7ffa0456bd2a56");

    if (user) {
      req.session.user = user;
      req.session.isAuthenticated = true;

      req.session.save((err) => {
        if (err) {
          throw err;
        }

        res.redirect("/");
      });
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
      res.redirect("/auth#register");
    } else {
      const user = new User({ email, password, name });
      await user.save();
      res.redirect("/auth#login");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
