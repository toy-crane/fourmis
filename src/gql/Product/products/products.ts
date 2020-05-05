import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const query: IResolvers = {
  Query: {
    products: async (_, { term = null }, ctx: Context) => {
      const { prisma } = ctx;
      let filterCondition;
      if (term) {
        filterCondition = {
          where: {
            OR: [
              {
                symbol: {
                  startsWith: term,
                },
              },
              {
                engName: {
                  startsWith: term,
                },
              },
              {
                korName: {
                  startsWith: term,
                },
              },
            ],
          },
        };
      }
      return prisma.product.findMany(filterCondition);
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
