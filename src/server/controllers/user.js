import { registerUserDb, loginUserDb } from "../domains/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
const secret = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const newUser = await registerUserDb(username, password, firstName, lastName);

    const token = jwt.sign({ id: newUser.id }, secret);
    return res.status(201).json({ user: newUser, token: token });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A user with the provided username already exists" });
      }
    }
    console.log("error", e)
    return res.status(500).json({ error: "Unable to create new user" });
  }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    try {
        const foundUser = await loginUserDb(
          username,
          password,
        );

        //If no user is found, return error. Also if user exists and password does not match, return error:
        if (
          !foundUser ||
          !(await bcrypt.compare(password, foundUser.password))
        ) {
          return res
            .status(401)
            .json({ error: "Invalid username or password" });
        }

        const token = jwt.sign({ id: foundUser.id }, secret);
        delete foundUser.password;
       return res.status(200).json({ user: foundUser, token });

    } catch(e) {
        return res.status(500).json({ error: "Unable to login user" });
    }
}

export { registerUser, loginUser };