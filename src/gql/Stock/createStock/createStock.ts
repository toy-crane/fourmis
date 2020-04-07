import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const mutation: IResolvers = {
  Mutation: {
    createStock: async (_, { symbol, engName, korName }, ctx, info) => {
      return prisma.createStock({
        symbol,
        engName,
        korName
      });
    }
  }
};
export default mutation;
