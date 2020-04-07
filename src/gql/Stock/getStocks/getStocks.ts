import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const query: IResolvers = {
  Query: {
    getStocks: async (_, {}, ctx, info) => {
      return prisma.stocks();
    }
  }
};
export default query;
