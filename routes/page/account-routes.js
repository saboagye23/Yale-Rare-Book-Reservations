const router = require('express').Router();
const bcrypt = require('bcrypt'); 
const { User } = require('../../models');
const saltRounds = parseInt(process.env.BR_PASSOWRD_SALT_ROUNDS);


router.get('/login', (req, res)=>{ 
    if (req.session.viewer !== undefined){
        res.redirect('/'); 
    } else {
        res.render('login', { 
        });
    }
    
});

router.post('/login', (req, res)=>{ 
    // login user
    User.findOne({
        where: {
            email: req.body.email
        },
        attributes: ['id', 'email', 'password_hash']
    })
    .then(userData => {
        if(!userData){
            res.render('login', {
                acct_msg: 'Username or Passowrd is wrong! <a href="/account/signup">Try creating a new account</a>'
            });
            return
        }
        bcrypt.compare(req.body.password, userData.password_hash, function(err, result) {
            if (result == true){
                req.session.viewer = userData
                res.redirect('/');
            } else {
                res.render('login', {
                    acct_msg: 'Provide valid email or passowrd'
                });
            }
        });
    })
    .catch(err => {
       console.error(err);
       res.render('login', {
        acct_msg: 'Provide valid email or passowrd'
       });
    });
});

router.get('/signup', (req, res)=>{ 
    if (req.session.viewer !== undefined){
        res.redirect('/'); 
    } else {
        res.render('signup');
    }
})

router.post('/signup', (req, res)=>{ 
    bcrypt.hash(req.body.password, saltRounds, function(err, password_hash) { 

        // Store hash in your password DB.
        User.create({
            email: req.body.email,
            password_hash: password_hash,
            full_name: req.body.full_name
        })
        .then(userData => {
            req.session.viewer = userData
            res.redirect('/');
        })
        .catch(err => {
            console.error(err);
            res.render('signup', {
                acct_msg: 'Provide valid email or passowrd.'
            });
        });
    });
})

router.get('/logout', (req, res)=>{ 
      // login user
    req.session.regenerate(function(err) {
        // will have a new session here
        res.redirect('/');
    });
})

module.exports = router;