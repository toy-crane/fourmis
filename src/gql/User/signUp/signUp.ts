import * as bcrypt from "bcryptjs";
import generateJWT from "../../../utils/auth/generateJWT";
import { IResolvers } from "graphql-tools";
import { prisma } from "../../../prisma";
prisma;

const mutation: IResolvers = {
  Mutation: {
    signUp: async (parent, { name, username, password, email }, ctx, info) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userExists = await prisma.user.findMany({
        where: {
          OR: [{ email }, { username }]
        }
      });
      if (userExists.length) {
        return new Error("User Already exists");
      }
      const user = await prisma.user.create({
        data: {
          name,
          username,
          email,
          password: hashedPassword
        }
      });
      const token = generateJWT(user.id, user.email);
      return {
        user,
        token
      };
    }
  }
};

export default mutation;
