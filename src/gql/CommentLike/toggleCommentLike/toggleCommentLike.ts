import { prisma } from "../../../prismaClient";
import { IResolvers } from "graphql-tools";

const mutation: IResolvers = {
  Mutation: {
    toggleCommentLike: async (_, { commentId }, { user }) => {
      const filterOptions = {
        comment: { id: commentId },
        user: { id: user.id }
      };
      const commentLikes = await prisma.commentLike.findMany({
        where: filterOptions
      });
      if (commentLikes.length > 0) {
        await prisma.commentLike.deleteMany({ where: filterOptions });
      } else {
        await prisma.commentLike.create({
          data: {
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
          }
        });
      }
      return true;
    }
  }
};
export default mutation;
