import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  // ADD THIS LINE HERE
  // console.log("AUTH HEADER:", req.headers.authorization);

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
