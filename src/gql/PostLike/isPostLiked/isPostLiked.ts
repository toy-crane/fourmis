import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const query: IResolvers = {
  Query: {
    isPostLiked: async (_, { postId }, { user }) => {
      const filterOptions = {
        post: { id: postId },
        user: { id: user.id }
      };
      return await prisma.$exists.postLike(filterOptions);
    }
  }
};
export default query;
