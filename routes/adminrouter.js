const express = require('express');
const router = express.Router();
const authController = require('../apps/controllers/admin/authcontroller'); // Đảm bảo đường dẫn đúng

// Route GET cho /admin
router.get('/', (req, res) => {
    res.render('admin/index'); // Bạn có thể thay đổi nội dung này
});
router.get("/FixThongTinDichVu", function (req, res) {
    res.render("admin/FixThongTinDichVu");
});
router.get("/remove_dichvu", function (req, res) {
    res.render("admin/remove_dichvu");
});
router.get("/quanlydichvu", function (req, res) {
    res.render("admin/quanlydichvu");
});
router.get("/remove_nhanvien", function (req, res) {
    res.render("admin/remove_nhanvien");
});
router.get("/FixThongTinNhanVien", function (req, res) {
    res.render("admin/FixThongTinNhanVien");
});
router.get("/remove_khachhang", function (req, res) {
    res.render("admin/remove_khachhang");
});
router.get('/FixThongTinKhachHang', (req, res) => {
    res.render('admin/FixThongTinKhachHang');
});
router.get("/quanlykhachhang", function (req, res) {
    res.render("admin/quanlykhachhang");
});
router.get("/quanlyNhanVien", function (req, res) {
    res.render("admin/quanlyNhanVien");
});
router.get("/profile", function (req, res) {
    res.render("admin/profile");
});
router.get("/LichLam", function (req, res) {
    res.render("admin/LichLam");
});
router.get('/register', (req, res) => {
    res.render('admin/register'); // Bạn có thể thay đổi nội dung này
});
router.get('/pages-login', (req, res) => {
    res.render('admin/pages-login'); // Bạn có thể thay đổi nội dung này
});

// Route POST cho đăng ký
router.post('/register', authController.register);
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
