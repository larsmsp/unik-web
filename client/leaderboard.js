var socket = socket || io();

var LeaderboardItem = React.createClass({
  render: function() {
    return React.createElement('tr', null,
      React.createElement('td', null,
        React.createElement('h2', null, this.props.position)),
      React.createElement('td', null,
        React.createElement('h2', null, '#', this.props.hashtag)),
      React.createElement('td', {className: 'text-right'},
        React.createElement('h2', null, this.props.points,
          React.createElement('span', {className: 'text-muted'}, ' poeng')))
    );
  }
});

var LeaderboardTable = React.createClass({
  render: function() {
    return React.createElement('table', {className: 'table'},
      React.createElement('tbody', null,
        this.props.teams.map(function (team) {
          return React.createElement(LeaderboardItem, team);
        })
      )
    );
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