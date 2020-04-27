import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const mutation: IResolvers = {
  Mutation: {
    createProduct: async (_, { symbol, engName, korName }, ctx: Context) => {
      const { prisma } = ctx;
      return prisma.product.create({
        data: {
          symbol,
          engName,
          korName,
        },
      });
    },
  },
};
export default mutation;
