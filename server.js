const express = require("express");
const cors = require("cors");
const logger = require("./logger");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./models");
const Position = db.position;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Employee Management System (EMS)" });
});

// routes
require('./routes/auth')(app);
require('./routes/user')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    logger.info(`Server is running on port ${PORT}.`);
});

process.on('uncaughtException', err => {
    logger.error(err && err.stack)
});

function initial() {
    Position.create({
        id: 1,
        name: "CEO",
        basic: 500000
    });
    Position.create({
        id: 2,
        name: "Director",
        basic: 300000
    });
    Position.create({
        id: 3,
        name: "GM",
        basic: 250000
    });
    Position.create({
        id: 4,
        name: "Manager",
        basic: 200000
    });
    Position.create({
        id: 5,
        name: "Sr. Programmer",
        basic: 150000
    });
    Position.create({
        id: 6,
        name: "Programmer",
        basic: 100000
    });
    Position.create({
        id: 7,
        name: "Jr. Programmer",
        basic: 50000
    });
}