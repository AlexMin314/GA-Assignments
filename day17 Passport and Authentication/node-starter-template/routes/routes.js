module.exports = function (app, passport) {

  // Routes
  // router middelware - checker
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/') // no auth - redirect
  }

  // Sign up
  app.get('/', function (req, res) {
    res.render('signup', { message: req.flash('loginMessage') });
  });

  // Sign up
  app.post('/', passport.authenticate('local-signup', {
    successRedirect: '/secret',
    failureRedirect: '/',
    failureFlash: true
  }));

  // Login
  app.get('/login', function (req, res) {
    res.render('login', { message: req.flash('loginMessage') });
  });

  // Login
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/secret',
    failureRedirect: '/login',
    failureFlash: true
  }));

  // facebook login -> need scope what info pass to facebook!
  // app.get('/auth/facebook', passport.authenticate('facebook', {
  //   scope: ['email', 'public_profile']
  // }));
  // app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  //   successRedirect: '/secret',
  //   failureRedirect: '/login',
  //   failureFlash: true
  // }));
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    res.redirect(req.session.returnTo || '/secret');
  });

  // twitter login
  // app.get('/auth/twitter', passport.authenticate('twitter'));
  // app.get('/auth/twitter/callback',
  //   passport.authenticate('twitter', { failureRedirect: 'http://127.0.0.1:3000/auth/twitter/callback' }),
  //   function (req, res) {
  //     // Successful authentication, redirect home.
  //     res.redirect('http://127.0.0.1:3000/');
  //   });
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
    res.redirect(req.session.returnTo || '/secret');
  });


  // Secret
  app.get('/secret', isLoggedIn, function (req, res) {
    res.render('secret', { message: req.flash('loginMessage') });
  });

  // logout
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
}
