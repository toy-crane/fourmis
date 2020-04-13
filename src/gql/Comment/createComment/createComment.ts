import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const mutation: IResolvers = {
  Mutation: {
    createComment: async (_, { postId, text }, { user }) => {
      return prisma.createComment({
        text,
        user: {
          connect: {
            id: user.id
          }
        },
        post: {
          connect: { id: postId }
        }
      });
    }
  }
};
export default mutation;
