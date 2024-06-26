const friendRouter = require('./friend');
const messageRouter = require('./message');
const commentRouter = require('./comment');
const postRouter = require('./post');
const userRouter = require('./user');
const authRouter = require('./auth');
const cameraRouter = require('./camera');
const notificationRouter = require('./notification');


function route(app) {
    app.use('/message', messageRouter);
    app.use('/friend', friendRouter);
    app.use('/comment', commentRouter);
    app.use('/post', postRouter);
    app.use('/user', userRouter);
    app.use('/', authRouter);
    app.use('/camera', cameraRouter);
    app.use('/notification', notificationRouter);
}

module.exports = route;
