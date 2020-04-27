import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const query: IResolvers = {
  Query: {
    board: async (_, { id }, ctx: Context) => {
      const { prisma } = ctx;
      return await prisma.board.findOne({ where: { id } });
    }
  },
  Board: {
    product: async ({ id }, _, ctx: Context) => {
      const { prisma } = ctx;
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
