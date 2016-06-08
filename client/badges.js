var testBadges = {
  badges:[
    {name: 'Early bird', value: 100, description: 'Få kontakt med din første device', image:'http://lorempixel.com/300/200/technics/1'},
    {name: 'Getting started', value: 25, description: 'Få kontakt med din første device', image:'http://lorempixel.com/300/200/technics/2'},
    {name: 'Moar powa!', value: 25, description: 'Få kontakt med Wall Plug', image:'http://lorempixel.com/300/200/technics/3'},
    {name: 'Soundcheck', value: 25, description: 'Spill av en lyd fra høytaleren', image:'http://lorempixel.com/300/200/technics/4'},
    {name: 'Pull request', value: 400, description: 'Skriv kode for et annet lag, som ikke er del av ditt lag sin løsning (og få den godkjent som en del av deres løsning!)', image:'http://lorempixel.com/300/200/technics/5'},
    {name: 'Open source', value: 300, description: 'Noe kode i løsningen deres er så god at et annet lag tar den i bruk som en del av deres løsning', image:'http://lorempixel.com/300/200/technics/6'},
    {name: 'Open sorcerer', value: 600, description: 'Koden i løsningen deres er så god at minst to andre lag tar den i bruk', image:'http://lorempixel.com/300/200/technics/7'},
    {name: 'Language elitist', value: 500, description: 'Tildeles til det laget som til en hver tid benytter flest ulike programmeringsspråk i løsningen', image:'http://lorempixel.com/300/200/technics/8'}
  ]
};

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

ReactDOM.render(
  React.createElement(Badges, testBadges),
  document.getElementById('badgesGrid')
);