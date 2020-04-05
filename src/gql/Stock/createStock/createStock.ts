import { prisma } from "../../../../generated/prisma-client";

export default {
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
