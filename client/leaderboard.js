var socket = socket || io();

var LeaderboardItem = React.createClass({
    render: function () {
        return React.createElement('tr', {key: this.props.hashtag},
            React.createElement('td', null, this.props.hashtag),
            React.createElement('td', null, this.props.badges.length),
            React.createElement('td', null, this.props.points));
    }
});

var LeaderboardTable = React.createClass({
    render: function () {
        return React.createElement('table', {className: 'table table-responsive'},
            React.createElement('thead', null,
                React.createElement('tr', null,
                    React.createElement('th', null, 'Lag'),
                    React.createElement('th', null, 'Merker'),
                    React.createElement('th', null, 'Poeng')
                )),
            React.createElement('thead', null,
                this.props.teams.map(function (team) {
                    return React.createElement(LeaderboardItem, team);
                }))
        )
    }
});

var indexTeams = function (teams) {
    var indexedTeams = [];
    for (var i = 0; i < teams.length; i++) {
        var indexedTeam = teams[i];
        indexedTeam.position = i + 1;
        indexedTeams.push(indexedTeam);
    }
    return indexedTeams;
}

socket.on('display:teams', function (teams) {
    ReactDOM.render(
        React.createElement(LeaderboardTable, {teams: indexTeams(teams)}),
        document.getElementById('leaderboardTable')
    );
});