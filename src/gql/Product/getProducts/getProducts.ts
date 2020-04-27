import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const query: IResolvers = {
  Query: {
    getProducts: async (_, {}, ctx: Context) => {
      const { prisma } = ctx;
      return prisma.product.findMany();
    },
  },
};
export default query;
