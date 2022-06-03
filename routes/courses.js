const { Router } = require("express");
const Course = require("../models/course");
const auth = require("../middleware/auth");
const router = Router();

router.get("/", async (_req, res) => {
  const courses = await Course.find().populate("userId", "email name");

  res.render("courses", {
    title: "Курсы",
    isCourses: true,
    courses,
  });
});

router.get("/add", auth, (_req, res) => {
  res.render("add", {
    title: "Добавить курс",
    isAdd: true,
  });
});

router.post("/add", auth, async (req, res) => {
  const { title, price, img } = req.body;
  const course = new Course({
    title,
    price,
    img,
    userId: req.user,
  });

  try {
    await course.save();
    res.redirect("/courses");
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id/edit", auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }

  const course = await Course.findById(req.params.id);

  res.render("course-edit", {
    title: `Редактировать ${course.title}`,
    course,
  });
});

router.post("/edit", auth, async (req, res) => {
  const { id } = req.body;
  delete req.body.id;

  try {
    await Course.findByIdAndUpdate(id, req.body);
    res.redirect("/courses");
  } catch (e) {
    console.log(e);
  }
});

router.post("/remove", auth, async (req, res) => {
  const { id } = req.body;
  delete req.body.id;

  try {
    await Course.findByIdAndDelete(id, req.body);
    res.redirect("/courses");
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.render("course", {
    layout: "empty",
    title: `Курс ${course.title}`,
    course,
  });
});

module.exports = router;
