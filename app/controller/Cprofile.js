const { User } = require("../model");
const pwSalt = require("../model/pwSalt");
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
  // ---------------- 암호화 적용후
  
  User.findOne({
    where: {
      u_id: req.session.user,
    },
  }).then((result) => {

    if(result) {
      pwSalt
            .comparePassword(
              req.body.password,
              result.salt,
              result.password
            )
            .then((pwCorrect) => {
              if(pwCorrect) {
                res.send({result: true});
              } else {
                res.send({ result: false});
              }
            })
              .catch((error) => {
                res.send({result: false});
              }); 
    } else {
      res.send({ result: false});
    } 
  }).catch((error) => {
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
    if (row) {
      res.send({ result: true });
    } else {
      res.send({ result: false });
    }
  });
};

exports.profileAllEdit = (req, res) => {
  // name,password 수정 실행
  const pw = req.body.pw;
  pwSalt
        .hashPassword(pw)
        .then(( {hashedPw, salt}) => {
          const data = {
            password: hashedPw,
            name: req.body.name,
            salt: salt,
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
          })
        })
};

// 회원 탈퇴 시 비밀번호 확인 페이지 관련
exports.deleteCheckPage = (req, res) => {
  res.render("editProfile_delete");
};

// 회원 탈퇴
exports.userDelete = (req, res) => {
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
              res.send({result: false});
            });
     } else {
       res.send({result: false});
     }
  }).catch((error) => {
    res.send({result: false});
  });
};
