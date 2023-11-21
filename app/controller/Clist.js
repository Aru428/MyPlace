const { Gallery, Heart } = require("../model");

// 카테고리 페이지 렌더
exports.categoryAllPage = (req, res) => {
  // 모든 갤러리 데이터
  Gallery.findAll().then((result) => {
    res.render("list", { data: result });
  });
};

exports.categoryExhibition = (req, res) => {
  Gallery.findAll({
    where: {
      category: "exhibition",
    },
  }).then((result) => {
    res.render("listExhibition", { data: result });
  });
};

exports.categoryArtgallery = (req, res) => {
  Gallery.findAll({
    where: {
      category: "artgallery",
    },
  }).then((result) => {
    res.render("listArtgallery", { data: result });
  });
};

exports.categoryMuseum = (req, res) => {
  Gallery.findAll({
    where: {
      category: "museum",
    },
  }).then((result) => {
    res.render("listMuseum", { data: result });
  });
};

exports.categoryPopup = (req, res) => {
  Gallery.findAll({
    where: {
      category: "popupstore",
    },
  }).then((result) => {
    res.render("listPopup", { data: result });
  });
};

// 찜 목록 페이지 렌더
exports.heartListPage = (req, res) => {
  Gallery.findAll({
    attribute: ["g_name", "imgurl", "address", "deadline"],
    include: [
      {
        model: Heart,
        where: { u_id: "sohee1" },
        required: true,
      },
    ],
  }).then((result) => {
    // res.send(result);
    res.render("heartlist", { data: result });
  });
};
