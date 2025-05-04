const express = require('express')
const accountController = require("../Controllers/accountController");
const authController = require("../Controllers/AuthController");
const router = express.Router();

router.post("/signup", authController.signup)
router.post("/login", authController.login, )
router.post("/update-password/:id",accountController.updatePassword)

router.route("/")
    .get(accountController.getAllUsers)
    .post(authController.protect, authController.restrictTo("admin"), accountController.createUser)

router.route("/:id")
    .get(accountController.getUser)
    .patch(authController.protect, authController.restrictTo("admin", "user"), accountController.updateUser)
    .delete(authController.protect, authController.restrictTo("admin"), accountController.deleteUser)

module.exports = router;