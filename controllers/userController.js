const User = require("../models/user");
const Message = require("../models/message");

exports.user_index = (req, res, next) => {
  User.find({}, "username").exec(function (err, users) {
    if (err) {
      return Next(err);
    }
    res.render("user-index", { title: "Users", users: users });
  });
};

exports.user_list = (req, res) => {
  res.send("NOT IMPLEMENTED: user list");
};

exports.user_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: user detail: ${req.params.id}`);
};
