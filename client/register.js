const e = React.createElement;
var RegisterForm = React.createClass({
  getDefaultProps: function () {
    return {
      text: 'Registrer'
    }
  },
  render: function () {
    return e(
      'form',
      { onSubmit: '' },
      e(
        'div',
        { className: 'form-group' },
        e(
          'label',
          { 'for': 'name', className: 'control-label' },
          'Gruppenavn:'
        ),
        e('input', { type: 'input', className: 'form-control', id: 'name', placeholder: 'Gruppenavn' })
      ),
      e(
        'div',
        { className: 'form-group' },
        e(
          'label',
          { 'for': 'email', className: 'control-label' },
          'E-postadresse:'
        ),
        e('input', { type: 'email', className: 'form-control', id: 'email', placeholder: 'eksempel@epost.no' })
      ),
      e(
        'div',
        { className: 'form-group' },
        e(
          'label',
          { 'for': 'repository_url', className: 'control-label' },
          'URL til kildekode (Github, Bitbucket e.l.):'
        ),
        e('input', { type: 'input', className: 'form-control', id: 'repository_url', placeholder: 'https://github.com/brukernavn/my-awesome-code' })
      ),
      e(
        'div',
        { className: 'form-group' },
        e('input', { type: 'submit', className: 'btn-primary btn' })
      )
    )
  }
});

ReactDOM.render(
  e(RegisterForm),
  document.getElementById('register')
);
