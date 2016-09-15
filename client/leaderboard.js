var socket = socket || io();

var LeaderboardItem = React.createClass({
  render: function() {
    return React.createElement('li', null,
      React.createElement('div', null,
        React.createElement('h2', null, this.props.hashtag),
        React.createElement('small', null, '#', this.props.hashtag),
        React.createElement('small', {className: 'text-right'}),
        React.createElement('small', null, this.props.points),
        React.createElement('small', {className: 'text-right'}, this.props.badges));
  }
});

var LeaderboardTable = React.createClass({
  render: function() {
    return React.createElement('ol', {className: 'table'},
      this.props.teams.map(function (team) {
        return React.createElement(LeaderboardItem, team);
      })
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