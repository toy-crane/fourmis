import { IResolvers } from "graphql-tools";
import { prisma } from "../../../prismaClient";

const mutation: IResolvers = {
  Mutation: {
    createProduct: async (_, { symbol, engName, korName }) => {
      return prisma.product.create({
        data: {
          symbol,
          engName,
          korName
        }
      });
    }
  }
};
export default mutation;
