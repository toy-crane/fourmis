import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const query: IResolvers = {
  Query: {
    products: async (_, {}, ctx: Context) => {
      const { prisma } = ctx;
      return prisma.product.findMany();
    },
  },
  Product: {
    board: async ({ id }, _, ctx: Context) => {
      const { prisma } = ctx;
      const boards = await prisma.board.findMany({
        where: { product: { id } },
      });
      return boards[0];
    },
  },
};
export default query;
