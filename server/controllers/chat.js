const Messages = require("../models/message.js");
const Users = require("../models/user");
const Dms = require("../models/dms");

exports.postMessage = async (req, res, next) => {
  if (!req.body.content) {
    return res.send({ added: false });
  }
  try {
    req.body.time = new Date(new Date().toUTCString());
    response = await Dms.findOne(
      { dmID: req.body.dmID },
      function (err, result) {
        result.messages.push(req.body);
        result.markModified("messages");
        result.save();
      }
    )
      .clone()
      .catch(function (err) {
        console.log(err);
      });
    if (response) {
      res.json(response);
    } else res.json({ added: false });
  } catch (err) {
    console.log(err);
    res.send({ added: false });
  }
};

exports.getMessages = async (req, res, next) => {
  if (!req.body) {
    return res.send({ found: false });
  }
  try {
    response = await Dms.findOne(req.body);
    if (response) {
      res.json(response);
    } else res.json({ found: false });
  } catch (err) {
    console.log(err);
    res.send({ added: false });
  }
};

exports.getDM = async (req, res, next) => {
  if (!req.body) {
    return res.send({ added: false });
  }
  try {
    targetUser = await Users.findOne({ username: req.body.username });
    if (targetUser._id) {
      dmID = await Dms.findOne({ dmID: targetUser._id + req.body.originID });
      if (dmID) {
        res.json(dmID);
      } else {
        dmID = await Dms.create({ dmID: targetUser._id + req.body.originID });
        res.json(dmID);
      }
    }
  } catch (err) {
    console.log(err);
    res.send({ added: false });
  }
};
