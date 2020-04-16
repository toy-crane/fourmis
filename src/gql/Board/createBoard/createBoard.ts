import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const mutation: IResolvers = {
  Mutation: {
    createBoard: async (_, { productId }, ctx, info) => {
      return await prisma.createBoard({
        product: {
          connect: {
            id: productId
          }
        }
      });
    }
  }
};
export default mutation;
