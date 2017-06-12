import express from 'express';
import User from '../model/user';
import passport from 'passport';
import { Strategy } from 'passport-local';
const localStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const router = express.Router();

const FBID = '1791762717800732';
const secretID = '05120082f2fc264987463def3299e54b';

/**
 * Serialize and deserialize user via cookie
 */

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findbyId(id, (err, user) => {
    done(err, user);
  });
});


/**
 * Setup local Strategy
 */

// passport.use(new localStrategy({ usernameField: 'email' },
//     (email, password, done) => {
//       User.findOne({ email: email.toLowerCase() }, (err, user) => {
//           if (err) return done(err);
//           if (!user) return done(null, false);
//           User.comparePassword(password, (err, isMathch) => {
//             if (err) return done(err);
//             if (isMatch) return done(null, false);
//
//             return done(null, false);
//           });
//         } // end of findOne
//       );
//     }) // end of new
// );

passport.use(new FacebookStrategy({
    clientID: '1791762717800732',
    clientSecret: '05120082f2fc264987463def3299e54b',
    callbackURL: '/auth/facebook/callback',
    profileField: ['public_profile'],
    passReqToCallback: true
  }, (req, accessToken, refreshToken, profile, done) => {
    console.log(profile);
  }) // end
);

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/secret');
});




/* GET index page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Login Page'
  });
});

router.post('/', (req, res, next) => {

  const email = req.body.username;
  const password = req.body.password;

  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      res.render('index', {
        title: 'Login Page'
      });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect('/secret');
    });
  })

  // User.find({ email: email }, (err, users) => {
  //   if (err) {
  //     res.render('index', {
  //       title: 'Express'
  //     });
  //   } else {
  //     users[0].comparePassword(password, (err, isMatch) => {
  //       if (isMatch) {
  //         res.redirect('/secret');
  //       } else {
  //         res.render('index', {
  //           title: 'Express'
  //         });
  //       }
  //     });
  //   }
  // });
});

router.get('/signup', (req, res, next) => {
  res.render('signup', {
    title: 'Signup'
  });
});

router.post('/signup', (req, res, next) => {

  const email = req.body.username;
  const password = req.body.password;

  const user = new User({
    email: email,
    password: password
  });

  user.save((err, user) => {

    console.log('User save');

    if (err) {
      console.log(err);
      res.render('signup', {
        title: 'Signup'
      });
    }
    res.redirect('/');
  });
});



router.get('/secret', (req, res, next) => {
  res.render('secret', {
    title: 'Major secret'
  });
});

export default router;
