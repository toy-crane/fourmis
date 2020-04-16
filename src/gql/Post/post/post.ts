import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const query: IResolvers = {
  Query: {
    post: async (_, { id }) => {
      const post = await prisma.post({ id });
      const viewsCount = post.viewsCount + 1;
      await prisma.updatePost({ where: { id }, data: { viewsCount } });
      return await prisma.post({ id });
    }
  },
  Post: {
    commentsCount: async parent => {
      const { id } = parent;
      return await prisma
        .commentsConnection({
          where: { post: { id } }
        })
        .aggregate()
        .count();
    },
    likesCount: async (parent, _, { user }) => {
      const { id } = parent;
      return await prisma
        .postLikesConnection({
          where: { post: { id }, user: { id: user.id } }
        })
        .aggregate()
        .count();
    }
  }
};
export default query;
