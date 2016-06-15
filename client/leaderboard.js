var socket = socket || io();

var LeaderboardItem = React.createClass({
  render: function() {
    return React.createElement('tr', null, 
      React.createElement('td', null, this.props.position),
      React.createElement('td', null, this.props.name),
      React.createElement('td', null, this.props.points)
    );
  }
});

var LeaderboardList = React.createClass({
  render: function() {
    return React.createElement('table', {className: 'table'},
      React.createElement('thead', null,
        React.createElement('tr', null,
          React.createElement('th', null, '#'),
          React.createElement('th', null, 'Navn'),
          React.createElement('th', null, 'Poeng')
        )
      ),
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
    React.createElement(LeaderboardList, {teams: indexTeams(teams)}),
    document.getElementById('leaderboardTable')
  );
});