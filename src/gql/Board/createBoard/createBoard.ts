import { prisma } from "../../../prismaClient";
import { IResolvers } from "graphql-tools";

const mutation: IResolvers = {
  Mutation: {
    createBoard: async (_, { productId }) => {
      return await prisma.board.create({
        data: {
          product: {
            connect: {
              id: productId
            }
          }
        }
      });
    }
  }
};
export default mutation;
