const friendRouter = require('./friend');
const messageRouter = require('./message');
const commentRouter = require('./comment');
const postRouter = require('./post');
const userRouter = require('./user');
const authRouter = require('./auth');


function route(app) {
    app.use('/message', messageRouter);
    app.use('/friend', friendRouter);
    app.use('/comment', commentRouter);
    app.use('/post', postRouter);
    app.use('/user', userRouter);
    app.use('/', authRouter);
}

module.exports = route;
