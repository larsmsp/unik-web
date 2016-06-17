var socket = socket || io();

var divideIntoRows = function (array, rowSize) {
  if (array.length <= rowSize) {
    return [array];
  }
  return [array.slice(0, rowSize)].concat(divideIntoRows(array.slice(rowSize, array.length), rowSize));
};

var Badge = React.createClass({
  render: function() {
    return React.createElement('div', {className: 'col-md-3'},
      React.createElement('div', {className: 'thumbnail'},
        React.createElement('img', {src: this.props.image}),
        React.createElement('div', {className: 'caption'},
          React.createElement('h4', null,
            this.props.name,
            React.createElement('span', {className: 'text-muted'}, ' - ', this.props.value, ' poeng')
          ),
          React.createElement('p', null,
            React.createElement('i', null, ' #', this.props.hashtag)),
          React.createElement('p', null, this.props.description)
        )
      )
    );
  }
});

var BadgeRow = React.createClass({
  render: function() {
    return React.createElement('div', {className: 'row'},
      this.props.badges.map(function (badge) {
        return React.createElement(Badge, badge);
      })
    );
  }
});

var Badges = React.createClass({
  render: function() {
    var badgeRows = divideIntoRows(this.props.badges, 4);
    return React.createElement('div', null,
      badgeRows.map(function (badgeRow) {
        return React.createElement(BadgeRow, {badges: badgeRow});
      })
    );
  }
});

socket.on('display:badges', function (badges) {
  ReactDOM.render(
    React.createElement(Badges, {badges: badges}),
    document.getElementById('badgesGrid')
  );
});