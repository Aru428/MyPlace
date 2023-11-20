const { Gallery } = require('../model');

// 카테고리 페이지 렌더
exports.categoryAllPage = (req, res) => {
  // 모든 갤러리 데이터
  Gallery.findAll().then((result) => {
    res.render('wishlist', { data: result });
  });
};

exports.categoryExhibition = (req, res) => {
  Gallery.findAll({
    where: {
      category: 'exhibition',
    },
  }).then((result) => {
    res.render('listExhibition', { data: result });
  });
};

exports.categoryArtgallery = (req, res) => {
  Gallery.findAll({
    where: {
      category: 'artgallery',
    },
  }).then((result) => {
    res.render('listArtgallery', { data: result });
  });
};

exports.categoryMuseum = (req, res) => {
  Gallery.findAll({
    where: {
      category: 'museum',
    },
  }).then((result) => {
    res.render('listMuseum', { data: result });
  });
};

exports.categoryPopup = (req, res) => {
  Gallery.findAll({
    where: {
      category: 'popupstore',
    },
  }).then((result) => {
    res.render('listPopup', { data: result });
  });
};
