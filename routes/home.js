const { Router } = require("express");
const router = Router();

router.get("/", (_req, res) => {
  res.render("index", {
    title: "Главная страница",
    isHome: true,
  });
});

module.exports = router;
