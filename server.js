var express = require('express'),
	app = express(),
	http = require('http').Server(app),

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

http.listen(port, () => {
    console.log('Server running on http://localhost:' + port + '/');
});
