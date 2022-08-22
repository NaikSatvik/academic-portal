const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
require('dotenv/config');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const app = express();

const UserModel = require('./models/User');
const User = require('./models/User');
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((res) => {
    console.log('DB Connected.');
});

const store = new MongoDBSession({
    uri: mongoURI,
    collection: 'academic-portal',
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(
    session({
        secret: 'this key will sign cookie',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/adminDash', (req, res) => {      //isAuth not applied critical.
    res.render('adminDash')
});

app.get('/stuDash', isAuth, (req, res) => {
    res.render('stuDash')
});

app.get('/facDash', isAuth, (req, res) => {
    res.render('facDash')
});

app.get('/guarDash', isAuth, (req, res) => {
    res.render('guarDash')
});

app.post('/login', async (req, res) => {
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

    // res.redirect('/stuDash');
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
});

app.get('/register', (req, res) => {
    res.render('registerUser')
});

app.post('/register', async (req, res) => {
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
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/login');
    });
});

app.listen(process.env.PORT, console.log('Server running on http://localhost:8080'));