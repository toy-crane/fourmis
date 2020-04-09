import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const mutation: IResolvers = {
  Mutation: {
    createPost: async (_, { boardId, content, title }, ctx, info) => {
      return prisma.createPost({
        board: {
          connect: {
            id: boardId
          }
        },
        title,
        content
      });
    }
  }
};
export default mutation;
