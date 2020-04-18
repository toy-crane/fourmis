import { prisma } from "../../../prismaClient";
import { IResolvers } from "graphql-tools";

const query: IResolvers = {
  Query: {
    boards: async (_, {}, ctx, info) => {
      return await prisma.board.findMany();
    }
  }
};
export default query;
