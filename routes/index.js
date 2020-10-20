var express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.status(200).jsonp({ success: true, about: 'mpg123-server-api', more: 'https://github.com/milankragujevic/mpg123-server-api' });
});

module.exports = router;
