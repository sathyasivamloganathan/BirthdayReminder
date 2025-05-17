import bcrypt, { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

const SaltRounds = 10;

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(SaltRounds);
  return hashSync(password, salt);
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};


export const getUserId = (req) => {
  const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Unauthorized: No token provided");
      }
  
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
      return userId;
}