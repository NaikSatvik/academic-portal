const express = require('express');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
require('dotenv/config');

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

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(
    session({
        secret: 'this key will sign cookie',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

//Routes Start
const loginRoutes = require('./routes/loginRoute');
const adminRoutes = require('./routes/adminRoute');
const studentRoutes = require('./routes/studentRoute');
const facultyRoutes = require('./routes/facultyRoute');
const guardianRoutes = require('./routes/guardianRoute');

app.use(loginRoutes);
app.use(adminRoutes);
app.use(studentRoutes);
app.use(facultyRoutes);
app.use(guardianRoutes);
//Routes End

app.listen(process.env.PORT, console.log('Server running on http://localhost:8080/login'));