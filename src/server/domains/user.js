import prisma from '../utils/prisma.js'
import bcrypt from "bcrypt";

const registerUserDb = async (username, password, firstName, lastName) => {
  return await prisma.user.create({
    data: {
      username,
      password: await bcrypt.hash(password, 6),
      firstName,
      lastName
    },
  });
};

const loginUserDb = async(username) => {
    return await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        password: true,
        firstName: true,
        lastName: true,
      },
    });
}

export { registerUserDb, loginUserDb };