var socket = socket || io();

var divideIntoRows = function (array, rowSize) {
  if (array.length <= rowSize) {
    return [array];
  }
  return [array.slice(0, rowSize)].concat(divideIntoRows(array.slice(rowSize, array.length), rowSize));
};

var Badge = React.createClass({
  render: function() {
    return React.createElement('div', {className: 'col-sm-6 col-md-3 col-xs-12 text-center'},
      React.createElement('div', {className: 'thumbnail bg-alternate'},
        this.props.image && React.createElement('img', {src: this.props.image, className: 'img-responsive' }),
        React.createElement('h4', null, '#', this.props.hashtag),
        React.createElement('h4', null, React.createElement('span', {className: 'text-success'}, this.props.value, ' poeng')),
        React.createElement('p', null, this.props.description)
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

var BadgeCategoryTable = React.createClass({
  render: function () {
    return React.createElement('div', null,
      React.createElement('h2', null, this.props.badges[0].category),
      React.createElement('hr', null),
      React.createElement(Badges, {badges: this.props.badges})
    );
  }
});

var CategorizedBadges = React.createClass({
  render: function () {
    return React.createElement('div', null,
      this.props.badgesByCategory.map((badges) => React.createElement(BadgeCategoryTable, {badges: badges}))
    );
  }
});

var groupByCategory = (badges) => {
  if (badges.length <= 0) {
    return []
  }
  badges = badges.sort((a,b) => {
    if (a.value > b.value) {
      return -1;
    } else if (a.value < b.value) {
      return 1;
    } else {
      return 0;
    }
  });
  return [badges.filter((badge) => badge.category === badges[0].category)]
    .concat(groupByCategory(badges.filter((badge) => badge.category !== badges[0].category)));
};

socket.on('display:badges', function (badges) {
  ReactDOM.render(
    React.createElement(CategorizedBadges, {badgesByCategory: groupByCategory(badges)}),
    document.getElementById('badgesGrid')
  );
});