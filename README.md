unikon-web
==========

_A website to organize a hackathon_

Visit the page at [unikon.herokuapp.com](https://unikon.herokuapp.com/)

### Install guide

_You'll need:_
* [Node](https://nodejs.org/en/download/)
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Heroku toolbelt](https://toolbelt.heroku.com/)

_Get up and running with:_
```
git clone https://github.com/teodoran/unik-web.git
cd unik-web
npm install
npm start
```

_Pushing to heroku:_

Login with the heroku toolbelt using `heroku login`. Here you'll either use the previously mentined heroku test-account (see Confluence), or you'll use your own personal account, and contact @teodoran to get push-rigths.

Then you'll have to add the heroku remote:

```
cd some-folder-/unik-web
heroku git:remote -a unikon
```

You shoud now be able to deploy the app to heroku using `git push heroku master`.
