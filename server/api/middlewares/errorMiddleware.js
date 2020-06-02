function errorMiddleware(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    res.set('Content-Type', 'application/json');
    res.status(400);
    res.send({
        error: true,
        message: res.err.message
    });
}

exports.errorMiddleware=errorMiddleware;