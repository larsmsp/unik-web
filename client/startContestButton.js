var socket = socket || io();

var StartContestButton = React.createClass({
  render: function () {
    return React.createElement('a', {href: this.props.link, className: 'btn btn-lg btn-call-to-action'}, this.props.text);
  }
});


socket.on('display:runningContest', function (runningContest) {
  var buttonProps = {
    link: runningContest ? '/contest' : '/information',
    text: runningContest ? 'Jeg er klar!' : 'Jeg vil ha mer informasjon!'
  };

  ReactDOM.render(
    React.createElement(StartContestButton, buttonProps),
    document.getElementById('startContestButton')
  );
});