const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contacts: {
    type: [
      {
        type: String,
      },
    ],
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
