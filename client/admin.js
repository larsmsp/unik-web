var socket = socket || io();

var AdminItem = React.createClass({
    render: function () {
        return React.createElement('tr', {key: this.props.hashtag},
            React.createElement('td', null, this.props.hashtag),
            React.createElement('td', null, this.props.badges.map(function (badge) {
                return React.createElement('p', null, '#' + badge);
            })),
            React.createElement('td', null, this.props.badges.length),
            React.createElement('td', null, this.props.points));
    }
});

var AdminTable = React.createClass({
    render: function () {
        return React.createElement('table', {className: 'table table-responsive'},
            React.createElement('thead', null,
                React.createElement('tr', null,
                    React.createElement('th', null, 'Lag'),
                    React.createElement('th', null, 'Merker'),
                    React.createElement('th', null, 'Antall'),
                    React.createElement('th', null, 'Poeng')
                )),
            React.createElement('thead', null,
                this.props.teams.map(function (team) {
                    return React.createElement(AdminItem, team);
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
    console.log(teams);
    ReactDOM.render(
        React.createElement(AdminTable, {teams: indexTeams(teams)}),
        document.getElementById('leaderboardTable')
    );
});