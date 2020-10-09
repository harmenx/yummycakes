"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getCake = function (req, res, db) {
    var id = req.params.id;
    db.findOne({ _id: id }, function (error, result) {
        res.json(result);
    });
};
var getCakes = function (req, res, db) {
    db.find({}, function (error, result) {
        res.json(result);
    });
};
var validation = function (cake) {
    if (cake.name === undefined || cake.comment === undefined || cake._id === undefined || cake.imageUrl === undefined || cake.yumFactor === undefined) {
        return false;
    }
    if (cake.comment.length < 5 || cake.comment.length > 200) {
        return false;
    }
    if (cake.yumFactor > 5 || cake.yumFactor <= 0) {
        return false;
    }
    return true;
};
var postCake = function (req, res, db) {
    var cake = req.body;
    if (validation(cake) === false) {
        res.status(400).json({ message: "Incorrect format for cake" });
        ;
    }
    ;
    delete cake._id;
    db.findOne({ "name": cake.name }, function (error, result) {
        if (result !== null) {
            res.status(400).json({ message: "Cake already exists" });
        }
        else {
            db.insert(cake, function (error, result) {
                res.json({ message: 'Success' });
            });
        }
    });
};
var putCake = function (req, res, db) {
    var cake = req.body;
    if (validation(cake) === false) {
        res.status(400);
    }
    ;
    db.findOne({ "name": cake.name }, function (error, result) {
        if (result !== null) {
            res.status(400).json({ message: "Cake already exists" });
        }
        else {
            db.update({ _id: cake._id }, cake, undefined, function (error, result) {
                res.json({ message: 'Cake succesfully updated' });
            });
        }
    });
};
var deleteCake = function (req, res, db) {
    var id = req.params.id;
    db.remove({ _id: id });
    res.json({ message: 'Cake succesfully deleted' });
};
module.exports = {
    getCake: getCake,
    getCakes: getCakes,
    postCake: postCake,
    putCake: putCake,
    deleteCake: deleteCake
};
