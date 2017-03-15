const e = React.createElement;
const fetch = window.fetch;
const storage = window.localStorage;

var RegisterStatus = React.createClass({
  propTypes: {
    index_name: React.PropTypes.string,
    error: React.PropTypes.string.isRequired,
  },

  getErrorMessage: function() {
    var error_code = this.props.error;
    if (error_code === '409') {
      return error_code + ': Brukernavnet er opptatt.';
    }
    else if (error_code === '400') {
      return error_code + ': Ett eller flere felter er ugyldig utfylt.'
    }
    else {
      return 'Feil: ' + error_code;
    }
  },

  render: function() {
    if (this.props.error) {
      return e('div', {className: 'alert alert-danger'}, this.getErrorMessage());
    } else if (this.props.index_name) {
      return e('div', {className: 'alert alert-success'},
        e('div', {}, 'Din API-nøkkel:'),
        e('div', {}, this.props.index_name)
      );
    }
    else {
      return false;
    }
  }

});

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
          value: 'Registrer',
          disabled: localStorage.getItem('index_name'),
        })
      ),
      e(RegisterStatus, { index_name: this.props.value.index_name, error: this.props.value.error })
    );
  }
});

var INITIAL_STATE = {
  name: "",
  email: "",
  repository_url: "",
  index_name: localStorage.getItem('index_name'),
  error: ""
}

function updateEntrant(entrant) {
  setState(entrant);
}

function registerEntrant() {
  if (!state.name || !state.email || !state.repository_url) {
    errorState = Object.assign({}, {error: "Ett eller flere felter er ikke utfylt."});
    setState(errorState);
    return;
  }
  fd = new FormData();
  fd.append('name', state.name);
  fd.append('email', state.email);
  fd.append('repository_url', state.repository_url);
  fetch('https://abakus-api-dot-sinuous-tine-156112.appspot.com/register', {
    method: 'post',
    body: fd
  }).then(function(response) {
    if (response.ok) {
      return response.text();
    }
    throw Error(response.status.toString());
  }).then(function(text) {
    localStorage.setItem('index_name', text);
    var entrant = Object.assign({}, { index_name: text, error: "" });
    setState(entrant);
  }).catch(function(err) {
    var errorState = Object.assign({}, INITIAL_STATE, { error: err.message });
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
