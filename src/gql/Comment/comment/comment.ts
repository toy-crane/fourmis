import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const query: IResolvers = {
  Query: {
    comment: async (_, { id }, ctx: Context) => {
      const { prisma } = ctx;
      return await prisma.comment.findOne({ where: { id } });
    },
  },
  Comment: {
    CommentlikesCount: async ({ id }, _, ctx: Context) => {
      const { user, prisma } = ctx;
      return await prisma.commentLike.count({
        where: { comment: { id }, user: { id: user.id } },
      });
    },
    isCommentLiked: async ({ id }, _, ctx: Context) => {
      const { user, prisma } = ctx;
      if (user) {
        const filterOptions = {
          comment: { id },
          user: { id: user.id },
        };
        const commentLikes = await prisma.commentLike.findMany({
          where: filterOptions,
        });
        return commentLikes.length > 0 ? true : false;
      } else {
        return false;
      }
    },
    user: async ({ id }, __, ctx: Context) => {
      const { prisma } = ctx;
      const comment = await prisma.comment.findOne({ where: { id } });
      const userId = comment.userId;
      return await prisma.user.findOne({ where: { id: userId } });
    },
  },
};
export default query;
