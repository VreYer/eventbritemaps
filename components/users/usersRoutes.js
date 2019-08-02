const { Router } = require('express');
const { check } = require('express-validator');
const usersController = require('./usersController');
const auth = require('../../middleware/auth');

const router = new Router();

router.get(
    '/', 
    auth, 
    usersController.getUsers
);

router.post(
    '/signup', 
    [
        check('username', 'Please write your name').not().isEmpty(),
        check('email', 'Your email is not valid').not().isEmpty().isEmail(),
        check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({min: 5})
    ],
    usersController.create
);

router.post(
    '/login', 
    [
        check('email', 'Please enter a email').not().isEmpty().isEmail(),
        check('password', 'Please enter a password').not().isEmpty()
    ],
    usersController.login
);

module.exports = router;