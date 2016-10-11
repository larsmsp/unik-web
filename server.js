var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	CNST = require('./constants.js'),
	twitter = require('./twitter.js');

	teams = CNST.TEAMS,
	port = process.env.PORT || 5000,
	// Maybe use 6000 for production. Rate limit is 180 calls in 15 minutes (every 5000 ms).
	interval = process.env.TIME_INTERVAL || 6000;

app.use('/', express.static('client'));

app.get('/contest', function (req, res) {
	res.sendFile(__dirname + '/client/contest.html')
});

app.get('/information', function (req, res) {
	res.sendFile(__dirname + '/client/badges.html')
});

app.get('/admin', function (req, res) {
	res.sendFile(__dirname + '/client/admin.html')
});

app.use('/node_modules', express.static('node_modules'));

io.on('connect', (socket) => {
    io.emit('display:teams', teams);
    io.emit('display:badges', CNST.BADGES);
    io.emit('display:runningContest', CNST.RUNNING_CONTEST);
});

var updateScores = () => {
	twitter.updateAllTeamScores((updatedTeams, noOfCalls) => {
	    teams = updatedTeams;
	    io.emit('display:teams', teams);
		setTimeout(updateScores, interval * noOfCalls);
	});
};
updateScores();

http.listen(port, () => {
    console.log('Server running on http://localhost:' + port + '/');
});