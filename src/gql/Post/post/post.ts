import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const query: IResolvers = {
  Query: {
    post: async (_, { id }, ctx: Context) => {
      const { prisma } = ctx;
      const post = await prisma.post.findOne({ where: { id } });
      if (post) {
        const viewsCount = post.viewsCount + 1;
        await prisma.post.update({ where: { id }, data: { viewsCount } });
        return await prisma.post.findOne({ where: { id } });
      } else {
        throw Error("Invalid postId");
      }
    },
  },
  Post: {
    commentsCount: async (parent, _, ctx: Context) => {
      const { prisma } = ctx;
      const { id } = parent;
      return await prisma.comment.count({ where: { post: { id } } });
    },
    likesCount: async (parent, _, ctx: Context) => {
      const { prisma, user } = ctx;
      const { id } = parent;
      return await prisma.postLike.count({
        where: { post: { id }, user: { id: user.id } },
      });
    },
    comments: async (
      { id: postId },
      { cursor = new Date().toISOString(), offset = 10 }
    ) => {
      return {
        postId,
        cursor,
        offset,
      };
    },
    isPostLiked: async ({ id }, _, ctx: Context) => {
      const { user, prisma } = ctx;
      if (user) {
        const filterOptions = {
          post: { id },
          user: { id: user.id },
        };
        const postLikes = await prisma.postLike.findMany({
          where: filterOptions,
        });
        return postLikes.length ? true : false;
      } else {
        return false;
      }
    },
  },
};
export default query;
