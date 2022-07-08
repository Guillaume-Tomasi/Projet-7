const router = require('express').Router();
const userCtrl = require('../controllers/user.controller');

router.post("/signup", userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getUser);
router.get('/', userCtrl.getAllUsers);

module.exports = router;