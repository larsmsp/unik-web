var testTeams = {
  teams:[
    {name: 'Team winners!', points: 5000},
    {name: 'SmallTalkers', points: 4300},
    {name: 'Laget til Petter', points: 2500},
    {name: 'SummerStudentzzzz', points: 2300},
    {name: 'Lambic laget', points: 1440}
  ]
};

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

ReactDOM.render(
  React.createElement(LeaderboardList, testTeams),
  document.getElementById('leaderboardList')
);