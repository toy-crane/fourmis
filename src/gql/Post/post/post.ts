import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const query: IResolvers = {
  Query: {
    post: async (_, { id }, ctx, info) => {
      return prisma.post({ id });
    }
  }
};
export default query;
