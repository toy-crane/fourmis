import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const query: IResolvers = {
  Query: {
    getPosts: async (_, { boardId, after, offset: first = 10 }, ctx, info) => {
      return prisma.posts({
        first,
        after,
        where: {
          board: {
            id: boardId
          }
        }
      });
    }
  }
};
export default query;
