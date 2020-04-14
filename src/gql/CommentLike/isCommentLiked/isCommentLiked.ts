import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const query: IResolvers = {
  Query: {
    isCommentLiked: async (_, { commentId }, { user }) => {
      const filterOptions = {
        comment: { id: commentId },
        user: { id: user.id }
      };
      return await prisma.$exists.commentLike(filterOptions);
    }
  }
};
export default query;
