const cookieParser = require('cookie-parser');
const session = require('express-session');
const authConfig = require('../../auth/config');

function initCookie(app) {
  app.use(cookieParser());

  app.use(session({
    key: 'user_sid',
    secret: authConfig.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: authConfig.expireTime,
    },
  }));

  app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');
    }
    next();
  });
}

module.exports = initCookie;
