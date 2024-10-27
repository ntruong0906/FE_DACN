var express = require("express");
var router = express.Router();

router.get('/', async (req, res) => {
    res.render('index');
});

router.use("/contact", require(__dirname + "/contactcontroller"));

// router.use("/detail", require(__dirname + "/detailcontroller"));

router.use("/about", require(__dirname + "/aboutcontroller"));

router.use("/service", require(__dirname + "/servicecontroller"));

router.get('/appointment', (req, res) => {
    res.render('appointment');
});



module.exports = router;