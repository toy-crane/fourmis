import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const mutation: IResolvers = {
  Mutation: {
    togglePostLike: async (_, { postId }, { user }) => {
      const filterOptions = {
        post: { id: postId },
        user: { id: user.id }
      };
      const likeExists = await prisma.$exists.postLike(filterOptions);
      if (likeExists) {
        await prisma.deleteManyPostLikes(filterOptions);
      } else {
        await prisma.createPostLike({
          post: {
            connect: {
              id: postId
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
