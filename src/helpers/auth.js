// verify if session is active
module.exports = {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            console.log('true');
            return next();
        }
        console.log('false');
        return res.redirect('/');
    }
}