var AnimateContest = React.createClass({
    getDefaultProps: function () {
        return {
            text: [
                'Hvem lager den beste IoT-løsningen?',
                'Fem timer',
                'En løsning',
                'Bli med i konkurransen'
            ]
        }
    },
    getInitialState: function () {
        return {
            typing: 1,
            position: 0,
            minDelay: 25,
            maxDelay: 50
        }
    },
    changePosition: function () {

        var that = this;

        if (this.state.position === this.props.text.length - 1) {
            document.getElementById('events').className = "visible";
            return;
        }


        if (this.state.typing !== -1) {
            setTimeout(function () {
                that.setState({
                    typing: -1,
                    minDelay: 10,
                    maxDelay: 20
                })
            }, 750);
        } else {
            this.setState({
                typing: 1,
                position: that.state.position + 1,
                minDelay: 25,
                maxDelay: 50
            });
        }
    },
    render: function () {
        return React.createElement('div', '&nbsp;',
            React.createElement(TypeWriter, {
                typing: this.state.typing,
                onTypingEnd: this.changePosition,
                minDelay: this.state.minDelay,
                maxDelay: this.state.maxDelay,
                fixed: true
            }, this.props.text[this.state.position])
        )
    }
});

ReactDOM.render(
    React.createElement(AnimateContest),
    document.getElementById('contest-info')
);