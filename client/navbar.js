var NavbarItem = React.createClass({
    render: function () {
        return React.createElement('a', {className: 'navbar-brand', href: this.props.link}, this.props.name);
    }
});

var Navbar = React.createClass({
    render: function () {
        return React.createElement('nav', {className: 'navbar navbar-inverse navbar-static-top'},
            React.createElement('div', {className: 'row'},
                React.createElement('div', {className: 'col-xs-12'},
                    React.createElement('div', {className: 'navbar-header'},
                        React.createElement('a', {className: 'navbar-brand', href: 'http://www.computas.com'},
                            React.createElement('img', {className: 'header-logo', src: 'images/computas-logo.svg'})),
                        this.props.items.map(function (item) {
                            return React.createElement(NavbarItem, item);
                        })
                    )
                )
            )
        );
    }
});

var items = [
    // {link: '/badges.html', name: 'Merker'},
    // {link: '/leaderboard.html', name: 'Poengtavle'}
];

ReactDOM.render(
    React.createElement(Navbar, {items: items}),
    document.getElementById('navbar')
);