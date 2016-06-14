var socket = socket || io();

var LeaderboardItem = React.createClass({
  render: function() {
    return React.createElement('li', null, this.props.name, ' - ', this.props.points);
  }
});

var LeaderboardList = React.createClass({
  render: function() {
    return React.createElement('ol', null,
      this.props.teams.map(function (team) {
        return React.createElement(LeaderboardItem, team);
      })
    );
  }
});

socket.on('display:teams', function (teams) {
  ReactDOM.render(
    React.createElement(LeaderboardList, {teams: teams}),
    document.getElementById('leaderboardList')
  );
});