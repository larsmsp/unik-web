var socket = socket || io();

// <a href="contest.html" class="btn btn-success btn-lg btn-call-to-action">Jeg er klar!</a>

var StartContestButton = React.createClass({
  render: function () {
    return React.createElement('a', {href: this.props.link, className: 'btn btn-success btn-lg btn-call-to-action'}, this.props.text);
  }
});


socket.on('display:runningContest', function (runningContest) {
  var buttonProps = {
    link: runningContest ? 'contest.html' : 'https://news.ycombinator.com/',
    text: runningContest ? 'Jeg er klar!' : 'Les mer og se merkene du kan vinne.'
  };

  ReactDOM.render(
    React.createElement(StartContestButton, buttonProps),
    document.getElementById('startContestButton')
  );
});