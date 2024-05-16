const helpers = {}

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', `You must log in`)
    res.redirect('/users/signin');
}

helpers.isAdmin = (req, res, next) => {
        if (req.isAuthenticated() && req.session.user.role === 'admin') {
            return next();
        }
        req.flash('error_msg', 'Access denied. Only administrators can perform this action.');
        res.redirect('/');
    };

module.exports = helpers;