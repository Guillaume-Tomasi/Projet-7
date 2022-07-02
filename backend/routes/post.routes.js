const router = require('express').Router();
const postController = require('../controllers/post.controller');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, postController.getAllPosts);
router.get('/:id', auth, postController.getPost);
router.post('/', auth, multer, postController.createPost);
router.put('/:id', auth, multer, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;