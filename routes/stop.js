var express = require('express'),
    router = express.Router(),
    mpg123 = require('../libs/mpg123');

/* /stop */
router.get('/', function (req, res, next) {
	mpg123.stop();
    res.status(200).jsonp({ success: true });
});

module.exports = router;
