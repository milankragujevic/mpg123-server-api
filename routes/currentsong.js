var express = require('express'),
    router = express.Router(),
    mpg123 = require('../libs/mpg123');

/* /currentsong */
router.get('/', function (req, res, next) {
    res.status(200).jsonp({ success: true, currentSong: mpg123.currentSong() });
});

module.exports = router;
