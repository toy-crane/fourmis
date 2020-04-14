import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const mutation: IResolvers = {
  Mutation: {
    toggleCommentLike: async (_, { commentId }, { user }) => {
      const filterOptions = {
        comment: { id: commentId },
        user: { id: user.id }
      };
      const likeExists = await prisma.$exists.commentLike(filterOptions);
      if (likeExists) {
        await prisma.deleteManyCommentLikes(filterOptions);
      } else {
        await prisma.createCommentLike({
          comment: {
            connect: {
              id: commentId
            }
          },
          user: {
            connect: {
              id: user.id
            }
          }
        });
      }
      return true;
    }
  }
};
export default mutation;
