const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('doctor-single');
});

module.exports = router;


