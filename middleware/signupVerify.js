const db = require("../models");
const User = db.user;
const Position = db.position;

signupVerify = (req, res, next) => {
    if(! req.body.full_name){
        res.status(400).send({
            message: "Failed! full_name is required."
        });
        return;
    }
    if(! req.body.email){
        res.status(400).send({
            message: "Failed! email is required."
        });
        return;
    }else{
        User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already used!"
                });
                return;
            }
        });
    }
    if(! req.body.password){
        res.status(400).send({
            message: "Failed! password is required."
        });
        return;
    }
    if(! req.body.position){
        res.status(400).send({
            message: "Failed! position is required."
        });
        return;
    }else{
        Position.findOne({ where: { name: req.body.position } })
        .then(position => {
            if (! position) {
                res.status(400).send({
                    message: "Failed! This Position not exists in this company.!"
                });
                return;
            }
        });
    }
    next();
};

signinVerify = (req, res, next) => {
    if(! req.body.email){
        res.status(400).send({
            message: "Failed! email is required."
        });
        return;
    }
    if(! req.body.password){
        res.status(400).send({
            message: "Failed! password is required."
        });
        return;
    }
    next();
};

module.exports = {signupVerify, signinVerify};
