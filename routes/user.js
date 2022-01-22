const multer  = require('multer');
var path = require('path');
const db = require("../models");
const User = db.user;
const Position = db.position;

const { verifyToken } = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

var upload = multer({ storage: storage });

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
     * Get all position list for signup data
     */
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
    
    /**
     * Get all employee by given the position
     * user can use position_id or position_name for getting the data
     */
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
    
    /**
     * Get all employee, just verify the token
     */
    app.get("/api/get/all/employee", [verifyToken], function(req, res, next){
        User.findAll({
            include: { model: Position, required: true }
        }).then(users => {
            if(users){
                res.status(200).send(users);
            }
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    });

    /**
     * Profile pic update
     */
    app.patch("/api/patch/user_img", [verifyToken, upload.single('avatar')], function(req, res, next){
        User.findOne({ where: { id: req.userId } })
        .then(function (record) {
            return record.update({img: 'uploads/' + req.file.filename});
        }).then(function (record) {
            res.status(200).send(record);
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    });
};
