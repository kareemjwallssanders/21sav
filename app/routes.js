module.exports = function (app, passport, db) {
  // normal routes ===============================================================
//login, about, search, sneaker collection,


  // Homepage ===============================
  // show the home page (will also have our homepage, login, sign up, about, search, sneaker collection, 
  //Sneaker Preference, Users Account, User Stage, User View links )
  app.get('/', function (req, res) {
    res.render('index.ejs')
  })
  // =============================================================================

  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------

  // LOGIN ===============================

  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') })
  })

  // process the login form
  // use a stratagey login authentican
  app.post('/login', passport.authenticate('local-login', {
      successRedirect: '/profile', // redirect to the secure profile section
      failureRedirect: '/login', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  )
  //=========================================

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })

  //=========================================

  

  // ABOUT ===============================
  app.get('/about', function (req, res) {
    res.render('index.ejs')
  })
  //= ========================================

  // SEARCH ==================================

  app.get('/search', function (req, res) {
    res.render('index.ejs')
  })
  //===========================================

  // SNEAKER COLLECTION ======================

  app.get('/sneaker collection', function (req, res) {
    res.render('index.ejs')
  })
  //=========================================

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function (req, res) {
    db.collection('messages')
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err)
        res.render('profile.ejs', {
          user: req.user,
          messages: result
        })
      })
  })

  //Renders entire sneaker collection to user Stage
  app.post('/profile', (req, res) =>{

  });


//Renders uploaded image and and descriptiond of site 
  app.post('/profile', (req, res) =>{

  });

  //allows user to delete images and or desription of sneaker coll.
  app.delete('/profile',(req,res) =>{

  });
  //=========================================


  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function (req, res) {
    db.collection('messages')
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err)
        res.render('profile.ejs', {
          user: req.user,
          messages: result
        })
      })
  })
  //=========================================


  // Userstage ===============================================================

  //Allows users to to take their account off User stage

  app.delete('/messages', (req, res) => {
    db.collection('messages').findOneAndDelete(
      { name: req.body.name, msg: req.body.msg },
      (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      }
    )
  })

  
  
  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user
    user.local.email = undefined
    user.local.password = undefined
    user.save(function (err) {
      res.redirect('/profile')
    })
  })
}

// route middleware to ensure user is logged in
function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) return next()

  res.redirect('/')
}
