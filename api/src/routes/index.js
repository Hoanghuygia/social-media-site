const newsRouter = require('./new');
// const siteRouter = require('./site');
// const courseRouter = require('./courses');

function route(app) {
    // app.get('/', (req, resp) => resp.render('home'));

    app.use('/new', newsRouter);
    // app.use('/course', courseRouter);
    // app.use('/', siteRouter);
}

module.exports = route; // we do not need to exports = router because this is not a router, only a function