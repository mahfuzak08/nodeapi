const db = require("../models");
const position = require("../models/position");
const User = db.user;
const Position = db.position;

checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }
        next();
    });
};

checkPositionExisted = (req, res, next) => {
    if(req.body.position){
        Position.findOne({
            where: {
                name: req.body.position
            }
        }).then(position => {
            if (! position) {
                res.status(400).send({
                    message: "Failed! This Position not exists in this company.!"
                });
                return;
            }
            next();
        });
    }
    else{
        res.status(400).send({
            message: "Failed! position field required.!"
        });
        return;
    }
};

const signupVerify = {
    checkDuplicateEmail,
    checkPositionExisted
};

module.exports = signupVerify;
