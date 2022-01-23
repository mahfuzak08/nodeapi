const { signupVerify, signinVerify } = require("../middleware/signupVerify");
const db = require("../models");
const authConfig = require("../config/auth");
const logger = require("../logger");

const User = db.user;
const Position = db.position;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/auth/signup", [ signupVerify ], function(req, res, next){
        // Save User to Database
        User.create({
            full_name: req.body.full_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            img: 'user.png',
            status: 1
        }).then(user => {
            Position.findOne({
                where: {
                    name: req.body.position
                }
            }).then(position => {
                if(position){
                    user.setPosition(position).then(() => {
                        res.send({ message: "User registered successfully!" });
                    });
                }
                else{
                    next();
                }
            });
        }).catch(err => {
            logger.error(err);
            res.status(500).send({ message: err.message });
        });
    });

    app.post("/api/auth/signin", [ signinVerify ], function(req, res, next){
        User.findOne({
            include: { model: Position, required: true },
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
        
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
        
            if (!passwordIsValid) {
                return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
            }
        
            var token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: 86400 // 24 hours
            });
            
            res.status(200).send({user, token});
        }).catch(err => {
            logger.error(err);
            res.status(500).send({ message: err.message });
        });
    });
};
