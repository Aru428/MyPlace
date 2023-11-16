const { Gallery } = require("../model");

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
