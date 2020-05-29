import generateJWT from "../../../utils/auth/generateJWT";
import { authenticateGoogle } from "../../../passport/google";
import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const mutation: IResolvers = {
  Mutation: {
    loginByGoogle: async (
      _,
      { accessToken, refreshToken = " " },
      ctx: Context
    ) => {
      const { req, res, prisma } = ctx;
      req.body = {
        ...req.body,
        access_token: accessToken,
        refresh_token: refreshToken,
      };
      let user: any;
      const {
        data: { profile },
      } = await authenticateGoogle(req, res);
      const email = profile.emails[0].value;
      const name = profile.displayName;
      user = await prisma.user.findOne({
        where: { email },
      });
      if (!user) {
        user = await prisma.user.create({ data: { email, name } });
      }
      const token = generateJWT(user.id, user.email);
      return {
        user,
        token,
      };
    },
  },
};

export default mutation;
