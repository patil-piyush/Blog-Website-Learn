const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName){
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue) return next();

        try {
            const payLoad = validateToken(tokenCookieValue);
            req.user = payLoad;
        } catch (error) {}

        return next();
    }
}




module.exports = {
    checkForAuthenticationCookie,
}