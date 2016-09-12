var AnimateContest = React.createClass({
    getDefaultProps: function () {
        return {
            text: [
                'Hvem lager den beste IoT-løsningen?',
                'Fem timer',
                'En løsning',
                'Vi ser dere på ...'
            ]
        }
    },
    getInitialState: function () {
        return {
            typing: 1,
            position: 0,
            minDelay: 100,
            maxDelay: 100
        }
    },
    changePosition: function () {
        var that = this;

        if (this.state.position === this.props.text.length - 1) {
            document.getElementById('events').className = "visible";
            return;
        }


        if (that.state.typing !== -1) {
            setTimeout(function () {
                that.setState({
                    typing: -1,
                    minDelay: 10,
                    maxDelay: 20
                })
            }, 500);
        } else {
            this.setState({
                typing: 1,
                position: that.state.position + 1,
                minDelay: 100,
                maxDelay: 200
            });
        }
    },
    componentWillMount: function (data) {
        console.log("Mounted", data);
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