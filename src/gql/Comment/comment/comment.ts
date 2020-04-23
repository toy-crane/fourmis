import { prisma } from "../../../prismaClient";
import { IResolvers } from "graphql-tools";

const query: IResolvers = {
  Comment: {
    CommentlikesCount: async (parent, _, { user }) => {
      const { id } = parent;
      return await prisma.commentLike.count({
        where: { comment: { id }, user: { id: user.id } }
      });
    },
    isCommentLiked: async ({ id }, _, { user }) => {
      if (user) {
        const filterOptions = {
          comment: { id },
          user: { id: user.id }
        };
        const commentLikes = await prisma.commentLike.findMany({
          where: filterOptions
        });
        return commentLikes.length > 0 ? true : false;
      } else {
        return false;
      }
    }
  }
};
export default query;
