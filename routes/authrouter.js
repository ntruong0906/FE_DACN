const express = require('express');
const router = express.Router();
const authController = require('../apps/controllers/admin/authcontroller'); // Đảm bảo đường dẫn đúng

// Định nghĩa route cho đăng ký
router.post('/register', authController.register); // Đảm bảo hàm `register` tồn tại trong `authcontroller`

router.post('/pages-login', authController.login);

// Định nghĩa route cho logout
router.get('/logout', (req, res) => {
    // Xóa session người dùng
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.redirect('/');
        }
        // Chuyển hướng về trang chủ sau khi đăng xuất
        res.redirect('/');
    });
});

module.exports = router;
