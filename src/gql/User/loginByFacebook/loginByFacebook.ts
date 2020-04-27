import { authenticateFacebook } from "../../../passport/facebook";
import generateJWT from "../../../utils/auth/generateJWT";
import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const mutation: IResolvers = {
  Mutation: {
    loginByFacebook: async (_, { accessToken }, ctx: Context) => {
      const { req, res, prisma } = ctx;
      req.body = {
        ...req.body,
        access_token: accessToken,
      };
      let user: any;
      const {
        data: { profile },
      } = await authenticateFacebook(req, res);
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
