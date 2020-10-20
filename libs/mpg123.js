var utils = require('./utils'),
    config = require('../config.json'),
    path = require('path'),
    debug = require('debug')('MPG123-Server-API::mpg123.js'),
    fs = require('fs'),
    whoami = null,
    currentSongCachedLogFileStat = null,
    currentSongCachedObject = null;

function whoIAm() {
    if (whoami === null) {
        whoami = utils.shellExecSync('whoami').trim();
    }
    return whoami;
}

function logFile() {
    return path.join(config.LOGS.MAIN_PATH, 'mpg123-server-api-' + whoIAm() + '.log');
}

function play() {
    debug('Playing shuffle');
	var musicDir = config.MUSIC_PATH;
    try {
        utils.shellExecSync('sudo bash -c "killall -HUP mpg123"');
    } catch (e) {}
    try {
        utils.shellExecSync('sudo bash -c "mpg123 -a hw:0 -T -1 -Z \"' + musicDir + '/*/*/*.mp3\"" > ' + logFile() + ' 2>&1 &');
    } catch (e) {}
}

function stop() {
    debug('Stop');
    try {
        utils.shellExecSync('sudo bash -c "killall -HUP mpg123"');
    } catch (e) {}
    try {
        fs.unlinkSync(logFile());
    } catch (e) {}
}

function currentSong() {
    var data = {},
        tmpCurrentSongLogFileStat = [];
	if(!fs.existsSync(logFile())) {
		data.trackName = '';
        data.artistName = '';
        data.albumName = '';
        data.genre = '';
        data.year = '';
		return data;
	}
    try {
        tmpCurrentSongLogFileStat = fs.statSync(logFile());
        if (currentSongCachedObject !== null &&
            currentSongCachedLogFileStat !== null &&
            currentSongCachedLogFileStat.mtime &&
            tmpCurrentSongLogFileStat.mtime &&
            tmpCurrentSongLogFileStat.mtime.getTime() === currentSongCachedLogFileStat.mtime.getTime()
			&&
			config.CACHE_METADATA_ENABLED
			) {
            data = currentSongCachedObject;
            debug('Sending current song info from cache');
        } else {
            debug('Sending NEW current song info');
            var full_contents = fs.readFileSync(logFile()).toString();
			var contents = full_contents.split('Playing MPEG stream').pop();
            // debug(contents);
			
			var trackName = contents.match(/Title\:(.*)/);
			if (trackName instanceof Array && trackName.length > 0) {
				data.trackName = trackName[1].trim().split("   ")[0].trim();
			} else {
				data.trackName = '';
			}
			
			var artistName = contents.match(/Artist\:(.*)/);
			if (artistName instanceof Array && artistName.length > 0) {
				data.artistName = artistName[1].trim().split("   ")[0].trim();
			} else {
				data.artistName = '';
			}
			
			var albumName = contents.match(/Album\:(.*)/);
			if (albumName instanceof Array && albumName.length > 0) {
				data.albumName = albumName[1].trim().split("   ")[0].trim();
			} else {
				data.albumName = '';
			}
			
			var genre = contents.match(/Genre\:(.*)/);
			if (genre instanceof Array && genre.length > 0) {
				data.genre = genre[1].trim().split("   ")[0].trim();
			} else {
				data.genre = '';
			}
			
			var year = contents.match(/Year\:(.*)/);
			if (year instanceof Array && year.length > 0) {
				data.year = year[1].trim().split("   ")[0].trim();
			} else {
				data.year = '';
			}
			
            currentSongCachedObject = data;
            currentSongCachedLogFileStat = {
                mtime: tmpCurrentSongLogFileStat.mtime
            };
        }
    } catch (e) {
        debug('ERROR CurrentSong:');
        debug(e);
        data.trackName = '';
        data.artistName = '';
        data.albumName = '';
        data.genre = '';
        data.year = '';
    }
    return data;
}

//======= exports 
exports.play = play;
exports.stop = stop;
exports.currentSong = currentSong;
