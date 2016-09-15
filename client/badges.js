var socket = socket || io();

var divideIntoRows = function (array, rowSize) {
  if (array.length <= rowSize) {
    return [array];
  }
  return [array.slice(0, rowSize)].concat(divideIntoRows(array.slice(rowSize, array.length), rowSize));
};

var Badge = React.createClass({
  render: function() {
    return React.createElement('div', {className: 'col-sm-6 col-md-3 badge-wrapper'},
      React.createElement('div', {className: 'thumbnail bg-alternate'},
        React.createElement('img', {src: this.props.image, className: 'img-responsive' }),
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

  return [badges.filter((badge) => badge.category === badges[0].category)]
    .concat(groupByCategory(badges.filter((badge) => badge.category !== badges[0].category))).sort(function (a, b) {
    if (a.points > b.points) {
      return 1;
    }
    if (a.points < b.points) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });;
};

socket.on('display:badges', function (badges) {
  ReactDOM.render(
    React.createElement(CategorizedBadges, {badgesByCategory: groupByCategory(badges)}),
    document.getElementById('badgesGrid')
  );
});