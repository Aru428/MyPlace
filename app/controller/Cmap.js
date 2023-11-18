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

exports.createComment = (req, res) => {
  console.log(req.body);
  // data
  const data = {
    u_id: "sohee3",
    g_id: 1,
    star: 3,
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

exports.getComment = (req, res) => {
  Comment.findAll({
    attributes: ["u_id", "star", "review"],
    where: {
      g_id: 1,
    },
    order: [["c_id", "DESC"]],
  }).then((result) => {
    // for (let i of result) {
    //   console.log(i.u_id);
    // }
    res.send({ result: result });
  });
};
