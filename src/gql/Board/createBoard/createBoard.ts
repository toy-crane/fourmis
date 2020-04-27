import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const mutation: IResolvers = {
  Mutation: {
    createBoard: async (_, { productId }, ctx: Context) => {
      const { prisma } = ctx;
      return await prisma.board.create({
        data: {
          product: {
            connect: {
              id: productId,
            },
          },
        },
      });
    },
  },
};
export default mutation;
