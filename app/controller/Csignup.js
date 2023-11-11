const { User } = require('../model')

exports.signUpPage = (req, res) => {
  res.render("signup");
};

exports.postSignUp = (req, res) => {
  User.create(req.body).then((result) => {
    console.log('User create:', result)
    res.send({ result: true })
  }).catch((err)=>{
    console.log("User create err : ", err)
    res.send({result : false})
  })
}

// userRouter.get("/signup", signup.signUpPage);
// userRouter.post("/signup", signup.postSignUp);