const e = React.createElement;
const fetch = window.fetch;

var RegisterForm = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  },

  onNameChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {name: e.target.value}));
  },

  onEmailChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {email: e.target.value}));
  },

  onUrlChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {repository_url: e.target.value}));
  },

  onIndexNameChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {index_name: e.target.value}));
  },

  onErrorChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {error: e.target.value}));
  },

  onSubmit: function(e) {
    e.preventDefault();
    this.props.onSubmit();
  },

  render: function () {
    return e('form', { onSubmit: this.onSubmit },
      e('div', { className: 'form-group' },
        e('label', { 'for': 'name', className: 'control-label' }, 'Gruppenavn:'),
        e('input', {
          type: 'text',
          className: 'form-control',
          id: 'name',
          placeholder: 'Gruppenavn',
          value: this.props.value.name,
          onChange: this.onNameChange
        })
      ),
      e('div', { className: 'form-group' },
        e('label', { 'for': 'email', className: 'control-label' },'E-postadresse:'),
        e('input', {
          type: 'email',
          className: 'form-control',
          id: 'email',
          placeholder: 'eksempel@epost.no',
          value: this.props.value.email,
          onChange: this.onEmailChange
        })
      ),
      e('div', { className: 'form-group' },
        e('label', { 'for': 'repository_url', className: 'control-label' }, 'URL til kildekode (Github, Bitbucket e.l.):'),
        e('input', {
          type: 'text',
          className: 'form-control',
          id: 'repository_url',
          placeholder: 'https://github.com/brukernavn/my-awesome-code',
          value: this.props.value.repository_url,
          onChange: this.onUrlChange
        })
      ),
      e('div', { className: 'form-group' },
        e('input', {
          type: 'submit',
          className: 'btn-primary btn',
          value: 'Registrering ikke åpnet',
          disabled: true,
        })
      ),
      e('div', {className: 'alert alert-success', hidden: this.props.value.index_name === ''}, this.props.value.index_name),
      e('div', {className: 'alert alert-danger', hidden: this.props.value.error === ''}, this.props.value.error)
    );
  }
});

var INITIAL_STATE = {name: "", email: "", repository_url: "", index_name: "", error: ""}

function updateEntrant(entrant) {
  setState(entrant);
}

function registerEntrant() {
  fd = new FormData();
  fd.append('name', state.name);
  fd.append('email', state.email);
  fd.append('repository_url', state.repository_url);
  fetch('https://api-dot-sinuous-tine-156112.appspot.com/index/register', {
    method: 'post',
    body: fd
  }).then(function(response) {
    if (response.ok) {
      return response.text();
    }
    throw Error(response.status + ' occured during registration.');
  }).then(function(text) {
    var entrant = Object.assign({}, state, {index_name: text, error: ""});
    setState(entrant);
  }).catch(function(err) {
    var errorState = Object.assign({}, INITIAL_STATE, {error: '' + err});
    setState(errorState);
  });
}

var state = {};

function setState(changes) {
  Object.assign(state, changes);
  ReactDOM.render(
    e(RegisterForm, Object.assign({}, {
      value: state,
      onChange: updateEntrant,
      onSubmit: registerEntrant,
    })),
    document.getElementById('registration-form')
  );
}

setState(Object.assign({}, INITIAL_STATE));
