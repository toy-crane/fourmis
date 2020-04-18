import { prisma } from "../../../prismaClient";
import { IResolvers } from "graphql-tools";

const query: IResolvers = {
  Query: {
    getProducts: async (_, {}) => {
      return prisma.product.findMany();
    }
  }
};
export default query;
