const { Gallery } = require('../model')

exports.mapPage = (req, res) => {
  res.render("map_api_complete");
};

exports.getMap = (req, res) => {
    Gallery.findAll().then((result) => {
      res.send(result)
    })
  }
