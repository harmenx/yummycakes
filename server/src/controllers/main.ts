import { Cake } from "../models";
import Nedb = require("../../node_modules/@types/nedb")

const getCake = (req: any, res: any, db: Nedb) => {
  const { id } = req.params;
  db.findOne({ _id: id }, function (error, result) {
    res.json(result);
  });

}
const getCakes = (req: any, res: any, db: Nedb) => {
  db.find({}, function (error: any, result: any) {
    res.json(result);
  });
}
const validation = (cake: Cake) => {

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
}
const postCake = (req: any, res: any, db: Nedb) => {
  const cake = req.body as Cake;

  if (validation(cake) === false) {
    res.status(400).json({ message: "Incorrect format for cake" });;
  };

  delete cake._id;

  db.findOne({ "name": cake.name }, function (error: any, result: any) {
    if (result !== null) {
      res.status(400).json({ message: "Cake already exists" });
    } else {
      db.insert(cake, function (error: any, result: any) {
        res.json({ message: 'Success' });
      });
    }
  });
}

const putCake = (req: any, res: any, db: Nedb) => {
  const cake = req.body as Cake;
  if (validation(cake) === false) {
    res.status(400);
  };
  db.findOne({ "name": cake.name }, function (error: any, result: any) {
    if (result !== null) {
      res.status(400).json({ message: "Cake already exists" });
    } else {
      db.update({ _id: cake._id }, cake, undefined, function (error: any, result: any) {
        res.json({ message: 'Cake succesfully updated' });
      });
    }
  });
}

const deleteCake = (req: any, res: any, db: Nedb) => {
  const { id } = req.params;
  db.remove({ _id: id })
  res.json({ message: 'Cake succesfully deleted' });
}

module.exports = {
  getCake,
  getCakes,
  postCake,
  putCake,
  deleteCake
}