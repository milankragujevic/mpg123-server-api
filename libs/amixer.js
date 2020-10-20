var utils = require('./utils'),
    config = require('../config.json');

function volumeGet() {
    var soundLevel = 0;
    try {
        soundLevel = utils.shellExecSync('amixer get  ' + config.SOUNDCARD.MAIN_CONTROLLER + ' | tail -1 | awk \'{print$5}\'');
        soundLevel = soundLevel.replace(/\[|\]|\%/g, '').trim();
        //soundLevel = utils.shellExecSync('amixer sget  ' + config.SOUNDCARD.MIXER + ' | awk -F"[][]" \'/dB/ { print $2 }\'');
    } catch (e) {}
    return soundLevel;
}

function volumeUp() {
    try {
        utils.shellExecSync('amixer -q set ' + config.SOUNDCARD.MAIN_CONTROLLER + ' 5+');
    } catch (e) {}
    return volumeGet();
}

function volumeDown() {
    try {
        utils.shellExecSync('amixer -q set ' + config.SOUNDCARD.MAIN_CONTROLLER + ' 5-');
    } catch (e) {}
    return volumeGet();
}

function volumeSet(level) {
    try {
        utils.shellExecSync('amixer -q set ' + config.SOUNDCARD.MAIN_CONTROLLER + ' ' + level + '%');
    } catch (e) {}
    return volumeGet();
}

function volumeState() {
    var soundState = 'on';
    try {
        soundState = utils.shellExecSync('amixer get  ' + config.SOUNDCARD.MAIN_CONTROLLER + ' | tail -1 | awk \'{print$7}\'').replace(/\[|\]/g, '').trim();
    } catch (e) {}
    return soundState;
}

function volumeToggle() {
    try {
        utils.shellExecSync('amixer -q set ' + config.SOUNDCARD.MAIN_CONTROLLER + ' toggle');
    } catch (e) {}
    return volumeState();
}

function volumeOn() {
    try {
        utils.shellExecSync('amixer -q set ' + config.SOUNDCARD.MAIN_CONTROLLER + ' on');
    } catch (e) {}
    return volumeState();
}

function volumeOff() {
    try {
        utils.shellExecSync('amixer -q set ' + config.SOUNDCARD.MAIN_CONTROLLER + ' off');
    } catch (e) {}
    return volumeState();
}

exports.volumeGet = volumeGet;
exports.volumeUp = volumeUp;
exports.volumeDown = volumeDown;
exports.volumeSet = volumeSet;
exports.volumeState = volumeState;
exports.volumeToggle = volumeToggle;
exports.volumeOn = volumeOn;
exports.volumeOff = volumeOff;
