const bcrypt = require('bcrypt');
const UserModel = require('../models/User');

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/login');
    }
}

const loginUser = async (req,res) => {
    const { role, email, password } = req.body;

    const userRole = await UserModel.findOne({ role });
    const user = await UserModel.findOne({ email });

    console.log("Entered Data:- " + role);
    console.log("Actual Data:- " + user.role);

    if (role != user.role) {
        return res.redirect('/login');
    }

    if (!user) {
        return res.redirect('/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.redirect('/login');
    }

    if (user.role == 'student') {
        req.session.isAuth = true;
        res.redirect('/stuDash');
    }
    if (user.role == 'faculty') {
        req.session.isAuth = true;
        res.redirect('/facDash');
    }
    if (user.role == 'guardian') {
        req.session.isAuth = true;
        res.redirect('/guarDash');
    }
}

const logoutUser = async (req,res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/login');
    });
}

module.exports = {
    isAuth,
    loginUser,
    logoutUser
}