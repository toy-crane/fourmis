import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";
import { BOARD_FRAGMENT } from "../../../fragment";

const query: IResolvers = {
  Query: {
    boards: async (_, {}, ctx, info) => {
      return prisma.boards().$fragment(BOARD_FRAGMENT);
    }
  }
};
export default query;
