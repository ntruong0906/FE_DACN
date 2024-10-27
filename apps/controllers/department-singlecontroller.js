const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('department-single');
});

module.exports = router;


