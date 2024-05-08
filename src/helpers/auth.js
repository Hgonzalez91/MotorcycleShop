const helpers = {}

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', `You must log in`)
    res.redirect('/users/signin');
}

helpers.isInSession = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', `You have not logged in`)
    res.redirect('/users/signin');
}

module.exports = helpers;