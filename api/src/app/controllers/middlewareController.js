const jwt = require("jsonwebtoken");

    exports.verifyToken = (req, res, next) => {
        const token = req.headers.authorization;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if(err){
                    res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            });
        }
        else {
            res.status(401).json("You're not authenticated");
        }
    }