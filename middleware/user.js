const jwt = require("jsonwebtoken");

const { JWT_USER_PASSWORD } = require("../routes/config");

const authenticateUser = (req , res , next) => {
    const token = req.headers.authorization;
   
    try {
        const decoded = jwt.verify(token , JWT_USER_PASSWORD);
        req.user = decoded.id;

        next();

    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = { authenticateUser };
