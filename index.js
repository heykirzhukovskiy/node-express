const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongodb-session")(session);
const path = require("path");

const addRoutes = require("./routes/add");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const coursesRoutes = require("./routes/courses");
const homeRoutes = require("./routes/home");
const ordersRoutes = require("./routes/orders");
const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");
const { MONGODB_URL } = require("./constants");

const app = express();
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
const store = new MongoStore({
  collection: "sessions",
  uri: MONGODB_URL,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(varMiddleware);
app.use(userMiddleware);

app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/courses", coursesRoutes);
app.use("/orders", ordersRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
