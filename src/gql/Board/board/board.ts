import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";
import { PRODUCT_FRAGMENT } from "../../../fragment";

const query: IResolvers = {
  Query: {
    board: async (_, { id }) => {
      return await prisma.board({ id });
    }
  },
  Board: {
    product: async ({ id }) => {
      const product = await prisma.products({ where: { board: { id } } });
      return product[0];
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
