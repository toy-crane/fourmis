import { prisma } from "../../../prismaClient";
import { IResolvers } from "graphql-tools";

const query: IResolvers = {
  Query: {
    post: async (_, { id }) => {
      const post = await prisma.post.findOne({ where: { id } });
      if (post) {
        const viewsCount = post.viewsCount + 1;
        await prisma.post.update({ where: { id }, data: { viewsCount } });
        return await prisma.post.findOne({ where: { id } });
      } else {
        throw Error("Invalid postId");
      }
    }
  },
  Post: {
    commentsCount: async parent => {
      const { id } = parent;
      return await prisma.comment.count({ where: { post: { id } } });
    },
    likesCount: async (parent, _, { user }) => {
      const { id } = parent;
      return await prisma.postLike.count({
        where: { post: { id }, user: { id: user.id } }
      });
    },
    comments: async (
      { id: postId },
      { cursor = new Date().toISOString(), offset = 10 }
    ) => {
      return {
        postId,
        cursor,
        offset
      };
    },
    isPostLiked: async ({ id }, _, { user }) => {
      if (user) {
        const filterOptions = {
          post: { id },
          user: { id: user.id }
        };
        const postLikes = await prisma.postLike.findMany({
          where: filterOptions
        });
        return postLikes.length ? true : false;
      } else {
        return false;
      }
    }
  }
};
export default query;
