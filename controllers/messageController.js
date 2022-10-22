const User = require("../models/user");
const Message = require("../models/message");

exports.message_create_get = (req, res, next) => {
  res.render("create_message", { user: req.user });
};

exports.message_create_post = (req, res, next) => {
  const message = new Message({
    title: req.body.title,
    text: req.body.text,
    timestamp: new Date(),
    user: req.user,
  }).save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.message_delete = (req, res, next) => {
  Message.findById(req.params.id).exec((err, message) => {
    if (err) {
      return next(err);
    }
    Message.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
};

// const user = new User({
//   username: req.body.username,
//   password: hashedPassword,
// }).save((err) => {
//   if (err) {
//     return next(err);
//   }
//   res.redirect("/");
// });
// });
