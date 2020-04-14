import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const mutation: IResolvers = {
  Mutation: {
    toggleLike: async (_, { postId }, { user }) => {
      const filterOptions = {
        post: { id: postId },
        user: { id: user.id }
      };
      const likeExists = await prisma.$exists.like(filterOptions);
      if (likeExists) {
        await prisma.deleteManyLikes(filterOptions);
      } else {
        await prisma.createLike({
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
