function mustAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/users/login');
        //return res.status(401).send({status: "Unauthorized"});
    }
    next();
}

module.exports=mustAuthenticated;