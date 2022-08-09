
const User = require("../Models/UserModel")
const jwt = require("jsonwebtoken")
// const Admin = require("../Models/AminModel")

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(
            token,
            "ishan super secret key",
            async (err, decodedToken) => {
                if (err) {
                    res.json({ status: false });
                    next();
                } else {
                    const user = await User.findById(decodedToken.id);
                    if (user) res.json({ status: true, user: user.email, name: user.name ,userId:user._id });
                    else res.json({ status: false });
                    next();
                }
            }
        );
    } else {
        res.json({ status: false });
        next();
    }
};
