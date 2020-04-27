import * as bcrypt from "bcryptjs";
import generateJWT from "../../../utils/auth/generateJWT";
import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const mutation: IResolvers = {
  Mutation: {
    login: async (_, { password, email }, ctx: Context) => {
      const user = await ctx.prisma.user.findOne({
        where: {
          email
        }
      });
      if (!user) {
        throw new Error("Wrong password or Email");
      }

      if (!user.password) {
        throw new Error("Facebook or Google Client does not has Password");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Wrong password or Email");
      }
      const token = generateJWT(user.id, user.email);
      return { token, user };
    }
  }
};

export default mutation;
