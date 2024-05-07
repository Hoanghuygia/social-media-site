const Friend = require('../models/Friend');

class FriendController {
    // [GET] /news
    showAll(req, res) {
        Friend.find()
            .then((data) => {
                return res.status(200).json({
                    msg: 'success',
                    data,
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    msg: error.message,
                });
            });
    }

    //[GET] /new/:slug
    show(req, res) {
        res.send('abc - show');
    }
}

module.exports = new FriendController();
