const express = require("express");
const app = express();
const PORT = 8000;
const session = require("express-session");

app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// 세션 설정 추가
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    },
  })
);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.user = req.session.user;
  console.log(res.locals.user);
  next();
});

const { mainRouter, userRouter, galleryRouter } = require("./routes");

// 메인페이지 경로
app.use("/", mainRouter);

// 회원 관련 경로
app.use("/user", userRouter);

// 갤러리 관련 경로
app.use("/gallery", galleryRouter);

app.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});
