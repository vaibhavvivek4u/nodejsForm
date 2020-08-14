const User = require("../model/UserModel");

exports.registerUser = (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    image: req.file.path,
  });
  newUser
    .save(newUser)
    .then((userAdded) => {
      //   console.log(userAdded);
      return res.json(userAdded);
    })
    .catch((err) => res.status(400).json(err));
};

exports.getUsers = (req, res) => {
  User.find()
    .then((users) => {
      return res.json(users);
    })
    .catch((err) => res.status(400).json(err));
};
