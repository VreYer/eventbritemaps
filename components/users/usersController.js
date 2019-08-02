const User = require('./usersModel');
const { validationResult } = require('express-validator');

exports.create = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() });
    }

    const { username, email, password } = req.body;
    
    try {

        let exUser = await User.findOne({ email });

        if (exUser) {
            return res.status(400).json({ msg: 'User with this email is already used.' })
        }

        const user = await User.create({
            username,
            email,
            password
        });
    
        const userToken = user.toAuthJSON();
        res.json(userToken);

    } catch (error) {
        return res.status(500).json({ message: error.errmsg });
    }
}

exports.login = async (req, res) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'There is no user with this data' })
        }
        
        if (!user.authenticateUser(password)) {
            return res.status(400).json({ msg: 'There is no user with this data' })
        }

        const userToken = user.toAuthJSON();
        res.json(userToken);

    } catch (error) {
        return res.status(500).json({ message: error.errmsg });
    }
}

exports.getUsers = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.errmsg });
    }
}