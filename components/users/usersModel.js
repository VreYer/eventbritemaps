const { Schema, model } = require('mongoose');
const { hashSync, compareSync } = require('bcrypt-nodejs');
const config = require('config');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Name is required!']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required!'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        trim: true,
        minlength: [6, 'Password need to be longer!']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
        return next();
    }

    return next();
});

UserSchema.methods = {

    authenticateUser(password) {
        return compareSync(password, this.password);
    },

    _hashPassword(password) {
        return hashSync(password);
    },

    authenticateUser(password) {
        return compareSync(password, this.password);
    },

    createToken() {
        return jwt.sign({
                _id: this._id
            },
            config.get('jwtSecret'),
        );
    },

    toAuthJSON() {
        return {
            //_id: this._id,
            token: this.createToken(),
        };
    },
    
};

module.exports = model('User', UserSchema);