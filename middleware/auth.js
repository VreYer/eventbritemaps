const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    
    // Get token
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, auth is neded' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
}