const responseMiddleware = (req, res, next) => {
    res.set('Content-Type', 'application/json');

    res.status(200);
    res.send(res.data);

    next();
}

exports.responseMiddleware=responseMiddleware;