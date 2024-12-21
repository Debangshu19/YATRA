const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistTokenModel = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await BlacklistTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await BlacklistTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        console.log("Token is blacklisted");
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token decoded:", decoded);
        const captain = await captainModel.findById(decoded._id);
        
        if (!captain) {
            console.log("Captain not found");
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.captain = captain;
        console.log("Captain authenticated:", captain);
        return next();
    } catch (err) {
        console.log("Error during authentication:", err);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
