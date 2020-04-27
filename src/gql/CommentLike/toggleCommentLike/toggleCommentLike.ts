import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const mutation: IResolvers = {
  Mutation: {
    toggleCommentLike: async (_, { commentId }, ctx: Context) => {
      const { prisma, user } = ctx;
      const filterOptions = {
        comment: { id: commentId },
        user: { id: user.id },
      };
      const commentLikes = await prisma.commentLike.findMany({
        where: filterOptions,
      });
      if (commentLikes.length > 0) {
        await prisma.commentLike.deleteMany({ where: filterOptions });
      } else {
        await prisma.commentLike.create({
          data: {
            comment: {
              connect: {
                id: commentId,
              },
            },
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        });
      }
      return true;
    },
  },
};
export default mutation;
