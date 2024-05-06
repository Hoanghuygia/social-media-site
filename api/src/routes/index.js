const friendRouter = require('./friend');

function route(app) {

    app.use('/friend', friendRouter);
}

module.exports = route; // we do not need to exports = router because this is not a router, only a function