const express = require('express')
const bookingController = require("../Controllers/bookingController");
const authController = require("../Controllers/AuthController");
const router = express.Router();

router.route("/")
    .get(bookingController.getAllBookings)
    .post(bookingController.createBooking)

router.route("/:id")
    .get(bookingController.getBook)
    .patch(authController.protect, authController.restrictTo("admin"),bookingController.updateBook)
    .delete(authController.protect, authController.restrictTo("admin", "user"),bookingController.deleteBook)

module.exports = router;