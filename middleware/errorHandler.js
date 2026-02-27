function notFound(req, res, next) {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
}

function errorHandler(err, req, res, next) {
    const statusCode = err.status || 500;

    console.error(`[ERROR] ${req.method} ${req.originalUrl} - ${err.message}`);
    if (statusCode === 500) {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        success: false,
        error: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
}

module.exports = { notFound, errorHandler };
