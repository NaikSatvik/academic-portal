const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000

const conn = mysql.createConnection({
    host: "academic-db.camgo0cjaizj.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "adminpass"
});

app.set('view engine', 'ejs')
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('pages/index')
});

app.get('/check-db', (req, res) => {
    conn.connect(function (err) {
        conn.query(`select * from academic_main_db.countrydata_final`, function (err, result, fields) {
            if (err) res.send(err);
            if (result) res.send(result);
        });
    });
});

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
});