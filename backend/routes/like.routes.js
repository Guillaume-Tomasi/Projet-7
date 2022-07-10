const router = require('express').Router();
const likeController = require('../controllers/like.controllers');
const auth = require('../middleware/auth');

router.get('/', auth, likeController.getAllLikes);
router.post('/', auth, likeController.createLike);
router.delete('/:id', auth, likeController.deleteLike);

module.exports = router;