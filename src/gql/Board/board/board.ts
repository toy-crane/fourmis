import { prisma } from "../../../prismaClient";
import { IResolvers } from "graphql-tools";

const query: IResolvers = {
  Query: {
    board: async (_, { id }) => {
      return await prisma.board.findOne({ where: { id } });
    }
  },
  Board: {
    product: async ({ id }) => {
      const products = await prisma.product.findMany({
        where: { board: { id } }
      });
      return products[0];
    },
    posts: async (
      { boardId },
      { cursor = new Date().toISOString(), offset = 10 }
    ) => ({
      boardId,
      cursor,
      offset
    })
  }
};
export default query;
