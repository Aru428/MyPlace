const { Gallery, Comment } = require("../model");

// 지도 화면 UI
exports.mapUiPage = (req, res) => {
  res.render("map");
};

// 지도 api 이용 페이지
exports.mapPage = (req, res) => {
  Gallery.findAll().then((result) => {
    res.render("map_api_complete", { data: result });
  });
};

exports.getMap = (req, res) => {
  Gallery.findAll().then((result) => {
    res.send(result);
  });
};

// 리뷰 생성
exports.createComment = (req, res) => {
  const data = {
    u_id: "sohee3",
    g_id: req.body.g_id,
    star: req.body.star,
    review: req.body.review,
  };

  Comment.create(data)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send("오류 발생");
    });
};

// 리뷰 조회
exports.getComment = (req, res) => {
  Comment.findAll({
    attributes: ["u_id", "star", "review"],
    where: {
      g_id: req.body.g_id,
    },
    order: [["c_id", "DESC"]],
  }).then((result) => {
    res.send({ result: result });
  });
};
