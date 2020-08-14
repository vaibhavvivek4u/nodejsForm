const router = require("express").Router();
const User = require("../model/UserModel");
const fileUpload = require("../middleware/file-upload");

const registerController = require("../controller/usersController");

// regsiter
router.post(
  "/register",
  fileUpload.single("image"),
  registerController.registerUser
);

// get user
router.get("/get-all", registerController.getUsers);

module.exports = router;
