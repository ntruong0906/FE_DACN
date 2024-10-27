const express = require('express');
const router = express.Router();
const bookingController = require('../apps/controllers/bookingcontroller');

// Tạo booking mới
router.post('/', bookingController.createBooking);

// Cập nhật booking
router.put('/:id/update', bookingController.updateBooking);

// Lấy tất cả bookings
router.get('/', bookingController.getAllBookings);

// Lấy booking theo ID
router.get('/:id', bookingController.getBookingById);

// Xác nhận booking
router.put('/:id/confirm', bookingController.confirmBooking);

// Hủy booking
router.put('/:id/cancel', bookingController.cancelBooking);

// Xóa booking
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
