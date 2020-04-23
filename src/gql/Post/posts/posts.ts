import { IResolvers } from "graphql-tools";
import { prisma } from "../../../prismaClient";

const query: IResolvers = {
  PostsConnection: {
    edges: async ({ boardId, cursor, offset }) => {
      const posts = await prisma.post.findMany({
        where: {
          board: { id: boardId },
          createdAt: { lt: cursor }
        },
        first: offset,
        orderBy: { createdAt: "desc" }
      });
      const postEdges = posts.map(post => ({
        cursor: post.createdAt,
        node: post
      }));
      return postEdges;
    },
    pageInfo: async parent => parent,
    totalCount: async ({ boardId }) => {
      return await prisma.post.count({
        where: {
          board: { id: boardId }
        }
      });
    }
  },
  PostPageInfo: {
    startCursor: async ({ cursor, boardId }) => {
      const posts = await prisma.post.findMany({
        where: {
          board: { id: boardId },
          createdAt: { lt: cursor }
        }
      });
      if (posts.length > 0) {
        const posts = await prisma.post.findMany({
          where: {
            board: { id: boardId },
            createdAt: { lt: cursor }
          },
          orderBy: { createdAt: "desc" }
        });
        return posts[0].createdAt;
      } else {
        return null;
      }
    },
    endCursor: async ({ cursor, boardId, offset }) => {
      const posts = await prisma.post.findMany({
        where: {
          board: { id: boardId },
          createdAt: { lt: cursor }
        },
        first: offset,
        orderBy: { createdAt: "desc" }
      });
      if (posts.length > 0) {
        return posts[posts.length - 1].createdAt;
      } else {
        return null;
      }
    },
    hasNextPage: async ({ cursor, boardId, offset }) => {
      return (
        (await prisma.post.count({
          where: {
            createdAt: { lt: cursor },
            board: { id: boardId }
          }
        })) > offset
      );
    },
    hasPreviousPage: async ({ boardId, cursor }) => {
      const posts = await prisma.post.findMany({
        where: {
          board: { id: boardId },
          createdAt: { gte: cursor }
        }
      });
      return posts.length > 0;
    }
  }
};
export default query;
