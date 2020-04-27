import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const query: IResolvers = {
  PostsConnection: {
    edges: async ({ boardId, cursor, offset }, _, ctx: Context) => {
      const { prisma } = ctx;
      const posts = await prisma.post.findMany({
        where: {
          board: { id: boardId },
          createdAt: { lt: cursor },
        },
        first: offset,
        orderBy: { createdAt: "desc" },
      });
      const postEdges = posts.map((post) => ({
        cursor: post.createdAt,
        node: post,
      }));
      return postEdges;
    },
    pageInfo: async (parent) => parent,
    totalCount: async ({ boardId }, _, ctx: Context) => {
      const { prisma } = ctx;
      return await prisma.post.count({
        where: {
          board: { id: boardId },
        },
      });
    },
  },
  PostPageInfo: {
    startCursor: async ({ cursor, boardId }, _, ctx: Context) => {
      const { prisma } = ctx;
      const posts = await prisma.post.findMany({
        where: {
          board: { id: boardId },
          createdAt: { lt: cursor },
        },
      });
      if (posts.length > 0) {
        const posts = await prisma.post.findMany({
          where: {
            board: { id: boardId },
            createdAt: { lt: cursor },
          },
          orderBy: { createdAt: "desc" },
        });
        return posts[0].createdAt;
      } else {
        return null;
      }
    },
    endCursor: async ({ cursor, boardId, offset }, _, ctx: Context) => {
      const { prisma } = ctx;
      const posts = await prisma.post.findMany({
        where: {
          board: { id: boardId },
          createdAt: { lt: cursor },
        },
        first: offset,
        orderBy: { createdAt: "desc" },
      });
      if (posts.length > 0) {
        return posts[posts.length - 1].createdAt;
      } else {
        return null;
      }
    },
    hasNextPage: async ({ cursor, boardId, offset }, _, ctx: Context) => {
      const { prisma } = ctx;
      return (
        (await prisma.post.count({
          where: {
            createdAt: { lt: cursor },
            board: { id: boardId },
          },
        })) > offset
      );
    },
    hasPreviousPage: async ({ boardId, cursor }, _, ctx: Context) => {
      const { prisma } = ctx;
      const posts = await prisma.post.findMany({
        where: {
          board: { id: boardId },
          createdAt: { gte: cursor },
        },
      });
      return posts.length > 0;
    },
  },
};
export default query;
