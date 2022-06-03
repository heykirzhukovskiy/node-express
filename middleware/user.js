const User = require("../models/user");

module.exports = async (req, _res, next) => {
  if (!req.session.user) {
    return next();
  }

  req.user = await User.findById(req.session.user._id);
  next();
};
