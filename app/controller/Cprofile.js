const { User } = require("../model");

// 회원 수정/탈퇴 선택 페이지 관련
exports.selectProfilePage = (req, res) => {
  res.render("editProfile_select");
};

// 회원 수정 페이지 관련

exports.editCheckPage = (req, res) => {
  // 수정 시 비밀번호 확인 페이지 렌더
  res.render("editProfile_editCheck");
};

exports.editCheckPw = (req, res) => {
  // 수정 전 비밀번호 확인
  User.findOne({
    where: {
      u_id: req.session.user,
      password: req.body.password,
    },
  }).then((row) => {
    if (row) {
      res.send({ result: true });
    } else {
      res.send({ result: false });
    }
  });
};

exports.profilePage = (req, res) => {
  // 회원 수정 페이지 렌더
  User.findOne({
    where: {
      u_id: req.session.user,
    },
  }).then((row) => {
    const data = {
      id: row.u_id,
      pw: row.password,
      name: row.name,
      email: row.email,
    };
    res.render("editProfile", { data: data });
  });
};

exports.profileEdit = (req, res) => {
  // 수정 실행
};

// 회원 탈퇴 시 비밀번호 확인 페이지 관련
exports.deleteCheckPage = (req, res) => {
  res.render("editProfile_delete");
};

exports.profileDelete = (req, res) => {};
