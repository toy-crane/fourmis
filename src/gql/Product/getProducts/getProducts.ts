import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const query: IResolvers = {
  Query: {
    getProducts: async (_, {}, ctx, info) => {
      return prisma.products();
    }
  }
};
export default query;
