import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const mutation: IResolvers = {
  Mutation: {
    createProduct: async (_, { symbol, engName, korName }, ctx, info) => {
      return prisma.createProduct({
        symbol,
        engName,
        korName
      });
    }
  }
};
export default mutation;
