var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	CNST = require('./constants.js'),
	twitter = require('./twitter.js');

	teams = CNST.TEAMS,
	port = process.env.PORT || 5000,
	// Maybe use 6000 for production. Rate limit is 180 calls in 15 minutes (every 5000 ms).
	interval = process.env.TIME_INTERVAL || 10000;

app.use('/', express.static('client'));

io.on('connect', (socket) => {
    io.emit('display:teams', teams);
    io.emit('display:badges', CNST.BADGES);
});

var updateScores = () => {
	twitter.updateAllTeamScores((updatedTeams, err) => {
	    if (err) {
	        console.log(err);
	    }
	    teams = updatedTeams;
	    io.emit('display:teams', teams);
	});
};

updateScores();
setInterval(() => updateScores(), interval);

http.listen(port, () => {
    console.log('Server running on http://localhost:' + port + '/');
});