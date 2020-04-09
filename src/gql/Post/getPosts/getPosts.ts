import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const query: IResolvers = {
  Query: {
    getPosts: async (_, { boardId }, ctx, info) => {
      return prisma.posts({
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
