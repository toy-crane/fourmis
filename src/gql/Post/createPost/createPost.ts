import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const mutation: IResolvers = {
  Mutation: {
    createPost: async (_, { boardId, content, title }, { user }) => {
      return prisma.createPost({
        board: {
          connect: {
            id: boardId
          }
        },
        user: { connect: { id: user.id } },
        title,
        content
      });
    }
  }
};
export default mutation;
