const { User } = require("../model");
const pwSalt = require("../model/pwSalt");
// 회원 수정/탈퇴 선택 페이지 관련
exports.selectProfilePage = (req, res) => {
  res.render("editProfile_select");
};

// 회원 수정 페이지 관련
exports.editCheckPage = (req, res) => {
  // 수정 시 비밀번호 확인 페이지 렌더
  console.log('req.session.user:::', req.session.user);
  res.render("editProfile_editCheck");
};

exports.editCheckPw = (req, res) => {
  // ---------------- 암호화 적용후
  console.log("req.session.user: ", req.session.user);
  
  User.findOne({
    where: {
      u_id: req.session.user,
    },
  }).then((result) => {
    console.log("result 값좀 찍어줘:",result);

    if(result) {
      pwSalt
            .comparePassword(
              req.body.password,
              result.salt,
              result.password
            )
            .then((pwCorrect) => {
              if(pwCorrect) {
                console.log("pwCorrect", pwCorrect);
                res.send({result: true});
              } else {
                res.send({ result: false});
              }
            })
              .catch((error) => {
                console.log('password에러 입니다.', error);
                res.send({result: false});
              }); 
    } else {
      res.send({ result: false});
    } 
  }).catch((error) => {
    console.log("유저의 존재를 못찾겠습니다.", error);
    res.send({result: false});
  })
  
};

exports.profilePage = (req, res) => {
  // 회원 수정 페이지 렌더
  User.findOne({
    where: {
      u_id: req.session.user,
    },
  }).then((result) => {
    console.log("result ==", result);
    const data = {
      id: result.u_id,
      email: result.email,
      pw: result.password,
      name: result.name,

    };
    res.render("editProfile", { data: data });
  });
};

exports.profileEdit = (req, res) => {
  // name 수정 실행
  const data = {
    name: req.body.name,
  };
  User.update(data, {
    where: {
      u_id: req.session.user,
    },
  }).then((row) => {
    console.log("row:", row);
    if (row) {
      res.send({ result: true });
    } else {
      res.send({ result: false });
    }
  });
};

exports.profileAllEdit = (req, res) => {
  // name,password 수정 실행
  const data = {
    password: req.body.pw,
    name: req.body.name,
  };
  User.update(data, {
    where: {
      u_id: req.session.user,
    },
  }).then((row) => {
    if (row) {
      res.send({ result: true });
    } else {
      res.send({ result: false });
    }
  });
};

// 회원 탈퇴 시 비밀번호 확인 페이지 관련
exports.deleteCheckPage = (req, res) => {
  console.log("req.session.user:::::::::", req.session.user);
  res.render("editProfile_delete");
};

// 회원 탈퇴
exports.userDelete = (req, res) => {
  console.log("req.session.user", req.session.user);
  User.findOne({
    where: {
      u_id : req.session.user,
    },
  }).then((result) => {
    if(result) {
      pwSalt
            .comparePassword(
              req.body.password,
              result.salt,
              result.password,
            ).then((pwCorrect) =>{
              if(pwCorrect) {
                User.destroy({
                  where: {
                    u_id: result.u_id,
                  },
                }).then((result) => {
                  req.session.destroy((err) =>{
                    if(err) throw err;
                  })
                })
                res.send({result: true});

              } else {
                res.send({result: false});
              }
            }).catch((error) => {
              console.log("pw ERROR", error);
              res.send({result: false});
            });
     } else {
       res.send({result: false});
     }
  }).catch((error) => {
    console.log('no user:' , error);
    res.send({result: false});
  });
};
