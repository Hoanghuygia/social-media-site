const friendRouter = require('./friend');

function route(app) {
    app.use('/friend', friendRouter);
}

module.exports = route;
