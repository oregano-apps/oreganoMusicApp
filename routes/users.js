const express = require("express");
const router = express.Router();
const userController = require("./../controllers/user");

router.post("/singup", userController.singup);
router.post("/login", userController.login);

router.patch("/likeSong", userController.likeSong)

module.exports = router;
