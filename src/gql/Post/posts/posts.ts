import { IResolvers } from "graphql-tools";
import { prisma } from "../../../../generated/prisma-client";

const query: IResolvers = {
  Query: {
    posts: async (_, { boardId, cursor, offset = 10 }, ctx, info) => {
      return prisma.posts({
        first: offset,
        after: cursor,
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
