// Import required modules
const express = require("express"),
      app = express(),
      moment = require('moment'),
      mysql = require("mysql"),
      cors = require('cors'),
      PORT = process.env.PORT || 6969;

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
    next();
}

app.use(logger)
app.use(cors())
app.use(express.json()); // Middleware to parse JSON body

// Connection to MySQL
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee",
});

// Initialization of connection
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// API - REPORT
app.get("/api/members", (req, res) => {
    connection.query("SELECT * FROM userdata", (err, rows, fields) => {
        if (err) throw err;
        res.json(rows);
    });
});

// POST - CREATE (example if needed)
// app.post("/api/members/insert", (req, res) => {
//    const { fname, lname, email, gender } = req.body;
//    connection.query(`INSERT INTO userdata (first_name, last_name, email, gender) VALUES ('${fname}', '${lname}', '${email}', '${gender}')`, (err, rows, fields) => {
//        if (err) throw err;
//        res.json({ msg: `Successfully inserted` });
//    });
// });

// API - UPDATE (example if needed)
// app.put("/api/members", (req, res) => {
//    const { fname, lname, email, gender, id } = req.body;
//    connection.query(`UPDATE userdata SET first_name='${fname}', last_name='${lname}', email='${email}', gender='${gender}' WHERE id='${id}'`, (err, rows, fields) => {
//        if (err) throw err;
//        res.json({ msg: `Successfully updated!` });
//    });
// });

// API - DELETE (example if needed)
// app.delete("/api/members", (req, res) => {
//    const { id } = req.body;
//    connection.query(`DELETE FROM userdata WHERE id='${id}'`, (err, rows, fields) => {
//        if (err) throw err;
//        res.json({ msg: `Successfully deleted!` });
//    });
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
