var express = require('express'),
    router = express.Router(),
    mpg123 = require('../libs/mpg123');

/* /play/:stationUrl */
router.get('/', function (req, res, next) {
	mpg123.play();
    res.status(200).jsonp({ success: true });
});

module.exports = router;
