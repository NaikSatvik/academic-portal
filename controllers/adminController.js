const bcrypt = require('bcrypt');
const UserModel = require('../models/User');

const registerUser = async (req,res) => {
    const { role, fname, lname, email, password, mobile, stud_of, guar_of, otp } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
        return res.redirect('/register');
    }
    const hashedPsw = await bcrypt.hash(password, 12);
    if (role == 'student') {
        user = new UserModel({
            role,
            fname,
            lname,
            email,
            password: hashedPsw,
            mobile,
            stud_of,
            guar_of: null,
            otp: null,
        });
        await user.save();
        res.redirect('/register');
    }
    if (role == 'faculty') {
        user = new UserModel({
            role,
            fname,
            lname,
            email,
            password: hashedPsw,
            mobile,
            stud_of: null,
            guar_of: null,
            otp: null,
        });
        await user.save();
        res.redirect('/register');
    }
    if (role == 'guardian') {
        user = new UserModel({
            role,
            fname,
            lname,
            email,
            password: hashedPsw,
            mobile,
            stud_of: null,
            guar_of,
            otp: null,
        });
        await user.save();
        res.redirect('/register');
    }
}

module.exports = {
    registerUser
}