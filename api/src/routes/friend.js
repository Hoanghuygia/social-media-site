const express = require('express');
const router = express.Router();

const auth = require('./../app/controllers/middlewareController');
const friendController = require('../app/controllers/FriendController');

router.use(auth.verifyToken);


/**
 * GET all friend
 * http://localhost:3000/friend
 */
router.get('/', friendController.showAll);

/**
 * POST add new friend
 * http://localhost:3000/friend
 */
router.post('/', friendController.addFriend);

/**
 * GET friend by ID
 * http://localhost:3000/friend/id/663903f6bf450b7c00f2ce2d
 */
router.get('/id/:id/', friendController.getByID);


/**
 * GET friend by ID
 * http://localhost:3000/friend/username/huy1234
 */
router.get('/username/:username', friendController.getByUsername);

/**
 * GET friend by field (choose)
 * http://localhost:3000/friend/byField?field=username&value=huy1234
 */
router.get('/byField/', friendController.getByField);

/**
 * PUT update friend information by id
 * http://localhost:3000/friend/id/663903f6bf450b7c00f2ce2d
 */
router.put('/id/:id', friendController.updateFriend);

/**
 * DELETE friend by id
 * http://localhost:3000/friend/id/IdToDelete
 */
router.delete('/id/:id', friendController.deleteByID);


module.exports = router;
