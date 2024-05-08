const userCtrl = {};
const passport = require('passport')
const User = require('../models/user.schema')

userCtrl.renderSignUpForm = (req, res ) =>{
    res.render('users/signup')
}

userCtrl.signUp = async (req, res ) =>{
    const errors = [];
    const {name, email, password, confirm_password} = req.body; 
    if(password != confirm_password){
        errors.push({text: 'Passwords do not match'});
    }
    if(password.length < 4){
        errors.push({text: 'Passwords must be at least 4 characters.'});
    }
    if(errors.length > 0){
        res.render('users/signup', {
            errors,
            name,
            email
        })
    } else {
        const emailUser = await User.findOne({email: email})
        if(emailUser){
            req.flash('error_msg', 'This email is already in use')
            res.redirect('/users/signup')
        } else {
            const newUser = new User({
                name,
                email,
                password,
                role: 'user'
            }); 
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save();
            req.flash('success_msg', `You're registered successfully` )
            res.redirect('/users/signin')
        }
    }
};


userCtrl.renderSignInForm = (req, res ) =>{
    res.render('users/signin')
}

userCtrl.signIn = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    failureFlash: true
});

userCtrl.signIn = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/users/signin'); }
        req.logIn(user, function(err) {
            if (err) { return next(err);
            }
            req.session.user = user;
            return res.redirect('/');
        });
    })(req, res, next);
};

userCtrl.logout = (req, res) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
    req.flash('success_msg', `You're logged out now.`)
    res.redirect('/users/signin')
})}

module.exports = userCtrl;