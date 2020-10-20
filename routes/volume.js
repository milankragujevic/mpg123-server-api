var express = require('express'),
    router = express.Router(),
    amixer = require('../libs/amixer');

/* /volume */
router.get('/', function (req, res, next) {
    res.status(200).jsonp({ success: true, soundLevel: amixer.volumeGet(), soundState: amixer.volumeState() });
});

/* /volume/up */
router.get('/up', function (req, res, next) {
    res.status(200).jsonp({ success: true, soundLevel: amixer.volumeUp() });
});

/* /volume/down */
router.get('/down', function (req, res, next) {
    res.status(200).jsonp({ success: true, soundLevel: amixer.volumeDown() });
});

/* /volume/set/:level */
router.get('/set/:level', function (req, res, next) {
    res.status(200).jsonp({ success: true, soundLevel: req.params.level ? amixer.volumeSet(req.params.level) : 0 });
});

/* /volume/state */
router.get('/state', function (req, res, next) {
    res.status(200).jsonp({ success: true, soundState: amixer.volumeState() });
});

/* /volume/toggle */
router.get('/toggle', function (req, res, next) {
    res.status(200).jsonp({ success: true, soundState: amixer.volumeToggle() });
});

/* /volume/on */
router.get('/on', function (req, res, next) {
    res.status(200).jsonp({ success: true, soundState: amixer.volumeOn() });
});

/* /volume/off */
router.get('/off', function (req, res, next) {
    res.status(200).jsonp({ success: true, soundState: amixer.volumeOff() });
});

module.exports = router;