var express = require("express");
var router = express.Router();
const passport = require("passport");
require("dotenv").config();
const User = require("../models/user");
const Message = require("../models/message");

/* GET home page. */
router.get("/", function (req, res, next) {
  Message.find({})
    .populate("user")
    .sort({ timestamp: -1 })
    .exec((err, messages) => {
      if (err) {
        return next(err);
      }
      res.render("index", {
        title: "Express",
        user: req.user,
        messages: messages,
      });
    });
});

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.get("/log-out", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post("/get-membership", (req, res, next) => {
  if (req.body.secretcode === process.env.MEMBER_PASS) {
    const user = new User({
      username: req.user.username,
      password: req.user.password,
      status: "Member",
      _id: req.user.id,
    });
    User.findByIdAndUpdate(user.id, user, {}, (err, theuser) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  }
  if (req.body.secretcode === process.env.ADMIN_PASS) {
    const user = new User({
      username: req.user.username,
      password: req.user.password,
      status: "Admin",
      _id: req.user.id,
    });
    User.findByIdAndUpdate(user.id, user, {}, (err, theuser) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  }
});

module.exports = router;
