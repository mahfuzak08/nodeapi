const config = require("../config/db");

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    config.DB, 
    config.USER,
    config.PASSWORD, 
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: 0,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.js")(sequelize, Sequelize);
db.position = require("./position.js")(sequelize, Sequelize);

db.position.hasMany(db.user);
db.user.belongsTo(db.position);

module.exports = db;
