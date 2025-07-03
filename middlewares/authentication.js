const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {}

    return next();
  };
}


const checkAuth = async (req,res, next) => {
  if(!req.user){
     res.redirect("/user/signin")
  }
 return next();
}

module.exports = {
  checkForAuthenticationCookie,
  checkAuth
};
