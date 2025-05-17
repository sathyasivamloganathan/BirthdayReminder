import jwt from "jsonwebtoken"

export const authenticateUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send("Unauthorized: No token provided")
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        // console.log("Decoded: ",decoded)
        next();
    } catch (error) {
        console.log("JWT verification failed")
        console.log(error);
    }
}