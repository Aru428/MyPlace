const { Gallery, Comment, Heart } = require("../model");

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
    u_id: req.session.user,
    g_id: req.body.g_id,
    star: req.body.star,
    review: req.body.review,
  };

  if (req.session.isAuthenticated == true) {
    Comment.create(data)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(500).send("오류 발생");
      });
  } else {
    res.send({ login: false });
  }
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


//사용자 갤러리 찜목록 조회 - 로그인 안했을 경우도 접근은 가능하게끔(if문)
exports.heartGallery = (req, res) => {
  if (req.session.isAuthenticated == true) {
    const u_id = req.session.user;
    const g_id = req.query.g_id;

    Heart.findAll({
      where: {
        u_id: u_id,
        g_id: g_id,
      },
    }).then((result) => {
      res.send({ data: result });
    });
  } else {
    res.send({ login: false });
  }
};


// 사용자가 찜한 갤러리 정보 조회
exports.getHeartUser = (req, res) => {
  if (req.session.isAuthenticated == true) {
    Gallery.findAll({
      attribute: ["gallery.*"],
      include: [
        {
          model: Heart,
          where: { u_id: req.session.user },
          required: true,
        },
      ],
    }).then((result) => {
      res.send(result);
    });
  } else {
    res.send({ login: false });
  }
};

// 찜한 데이터 저장
exports.createHeart = (req, res) => {
  if (req.session.isAuthenticated == true) {
    const data = {
      u_id: req.session.user,
      g_id: req.body.g_id,
    };

    Heart.create(data)
      .then((result) => {
        res.send({ data: result });
      })
      .catch((error) => {
        console.error("데이터 저장 중 오류가 발생했습니다:", error);
        res.status(500).send({ error: "데이터 저장 중 오류가 발생했습니다" });
      });
  } else {
    res.send({ login: false });
  }
};

// 찜한 데이터 삭제
exports.deleteHeart = (req, res) => {
  if (req.session.isAuthenticated == true) {
    const g_id = req.params.g_id;

    Heart.destroy({
      where: {
        u_id: req.session.user,
        g_id: g_id,
      },
    })
      .then((result) => {
        res.send({ result: result });
      })
      .catch((error) => {
        console.error("데이터 삭제 중 오류가 발생했습니다:", error);
        res.status(500).send({ error: "데이터 삭제 중 오류가 발생했습니다" });
      });
  } else {
    res.send({ login: false });
  }
};
