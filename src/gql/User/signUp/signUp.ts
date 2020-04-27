import * as bcrypt from "bcryptjs";
import generateJWT from "../../../utils/auth/generateJWT";
import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const mutation: IResolvers = {
  Mutation: {
    signUp: async (_, { name, username, password, email }, ctx: Context) => {
      const { prisma } = ctx;
      const hashedPassword = await bcrypt.hash(password, 10);
      const userExists = await prisma.user.findMany({
        where: {
          OR: [{ email }, { username }],
        },
      });
      if (userExists.length) {
        return new Error("User Already exists");
      }
      const user = await prisma.user.create({
        data: {
          name,
          username,
          email,
          password: hashedPassword,
        },
      });
      const token = generateJWT(user.id, user.email);
      return {
        user,
        token,
      };
    },
  },
};

export default mutation;
