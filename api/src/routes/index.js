const friendRouter = require('./friend');
const authRouter = require('./auth');
function route(app) {
    app.use('/friend', friendRouter);
    app.use('/', authRouter);
}

module.exports = route;
