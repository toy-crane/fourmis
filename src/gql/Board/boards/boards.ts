import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const query: IResolvers = {
  Query: {
    boards: async (_, {}, ctx: Context) => {
      const { prisma } = ctx;
      return await prisma.board.findMany();
    },
  },
};
export default query;
