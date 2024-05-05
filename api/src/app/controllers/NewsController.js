class NewsController {
    // [GET] /news
    index(req, res) {
        res.send('home');
    }

    //[GET] /new/:slug
    show(req, res) {
        res.send('abc - show');
    }
}

module.exports = new NewsController();