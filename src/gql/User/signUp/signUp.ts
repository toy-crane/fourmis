import * as bcrypt from "bcryptjs";
import { prisma } from "../../../../generated/prisma-client";
import generateJWT from "../../../utils/auth/generateJWT";
import { IResolvers } from "graphql-tools";

const mutation: IResolvers = {
  Mutation: {
    signUp: async (parent, { name, username, password, email }, ctx, info) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userExists = await prisma.$exists.user({
        OR: [{ email }, { username }]
      });
      if (userExists) {
        return new Error("User Already exists");
      }
      const user = await prisma.createUser({
        name,
        username,
        email,
        password: hashedPassword
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
