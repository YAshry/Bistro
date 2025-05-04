const express = require("express");
const userCommentController = require("../Controllers/userCommentController");
const authController = require("../Controllers/AuthController");
const router = express.Router();

router.route("/")
    .get(userCommentController.getAllComments)
    .post(authController.protect, authController.restrictTo("admin", "user"), userCommentController.createComment)

router.route("/:id")
    .get(userCommentController.getComment)
    .patch(authController.protect, authController.restrictTo("admin"), userCommentController.updateComment)
    .delete(authController.protect, authController.restrictTo("admin"), userCommentController.deleteComment)

module.exports = router;