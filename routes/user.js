const db = require("../models");
const User = db.user;
const Position = db.position;

const { verifyToken } = require("../middleware/auth");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/get/position", function(req, res, next){
        Position.findAll({
                attributes: { exclude: ['basic'] }
            }).then(positions => {
            if (positions) {
                return res.status(200).send(positions);
            }
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    });
    
    app.get("/api/get/employee_by_position", [verifyToken], function(req, res, next){
        // console.log(29, req.userId);
        if(req.query.position_id){
            User.findAll({
                include: { model: Position, required: true },
                where: {
                    posId: req.query.position_id
                }
            }).then(users => {
                if(users){
                    res.status(200).send(users);
                }
            }).catch(err => {
                res.status(500).send({ message: err.message });
            });
        }
        else if(req.query.position_name){
            Position.findOne({
                where: {
                    name: req.query.position_name
                }
            }).then(position => {
                User.findAll({
                    include: { model: Position, required: true },
                    where: {
                        posId: position.id
                    }
                }).then(users => {
                    if(users){
                        res.status(200).send(users);
                    }
                });
            }).catch(err => {
                res.status(500).send({ message: err.message });
            });
        }
        else{
            next();
        }
    });

//   app.get(
//     "/api/test/user",
//     [authJwt.verifyToken],
//     controller.userBoard
//   );

//   app.get(
//     "/api/test/mod",
//     [authJwt.verifyToken, authJwt.isModerator],
//     controller.moderatorBoard
//   );

//   app.get(
//     "/api/test/admin",
//     [authJwt.verifyToken, authJwt.isAdmin],
//     controller.adminBoard
//   );
};
