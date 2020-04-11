import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";
import { BOARD_FRAGMENT } from "../../../fragment";

const query: IResolvers = {
  Query: {
    board: async (_, { id }, ctx, info) => {
      return prisma.board({ id }).$fragment(BOARD_FRAGMENT);
    }
  }
};
export default query;
