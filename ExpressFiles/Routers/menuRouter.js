const express = require("express");
const menuController = require("../Controllers/menuController");
const authController = require("../Controllers/AuthController");
const router = express.Router();

router.route("/")
    .get(menuController.getAllMenu)
    .post(authController.protect, authController.restrictTo("admin"), menuController.createMenu)

router.route("/:id")
    .get(menuController.getMenu)
    .patch(authController.protect, authController.restrictTo("admin"), menuController.updateMenu)
    .delete(authController.protect, authController.restrictTo("admin"), menuController.deleteMenu)

module.exports = router;