import prisma from "../utils/prisma.js";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(400).json({
      error: "Authorization missing in headers",
    });
  }
  
  try {
    const decoded = jwt.verify(token, secret);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      include: {
        trips: true
      },
    });

    req.user = user;

  } catch (e) {
    return res.status(401).json({
      error: "Invalid credentials",
    });
  }
  next();
}
