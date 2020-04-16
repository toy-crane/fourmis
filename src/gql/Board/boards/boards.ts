import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const query: IResolvers = {
  Query: {
    boards: async (_, {}, ctx, info) => {
      return await prisma.boards();
    }
  }
};
export default query;
