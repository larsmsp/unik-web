var NavbarItem = React.createClass({
  render: function() {
    return React.createElement('a', {className: 'navbar-brand', href: this.props.link}, this.props.name);
  }
});

var Navbar = React.createClass({
  render: function() {
    return React.createElement('nav', {className: 'navbar navbar-inverse navbar-fixed-top'},
      React.createElement('div', {className: 'container'},
        React.createElement('div', {className: 'navbar-header'},
          this.props.items.map(function (item) {
            return React.createElement(NavbarItem, item);
          })
        )
      )
    );
  }
});

var items = [
  {link: '/', name:'UNIK'},
  {link: '/badges.html', name:'Merker'},
  {link: '/leaderboard.html', name:'Poengtavle'}
];

ReactDOM.render(
  React.createElement(Navbar, {items: items}),
  document.getElementById('navbar')
);