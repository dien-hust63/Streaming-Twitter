const Data = require("../models");

const respond = (req, res, next) => {

  Data.find({}, function (err, data) {
    if (err) {
      next();
    } else {
      res.status(200).json(data);
    }
  });
};

module.exports = respond;
