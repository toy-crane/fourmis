import { IResolvers } from "graphql-tools";
import { prisma } from "../../../../generated/prisma-client";

const query: IResolvers = {
  PostsConnection: {
    edges: async ({ boardId, cursor, offset }) => {
      const posts = await prisma.posts({
        where: {
          board: { id: boardId },
          createdAt_lt: cursor
        },
        first: offset,
        orderBy: "createdAt_DESC"
      });
      const postEdges = posts.map(post => ({
        cursor: post.createdAt,
        node: post
      }));
      return postEdges;
    },
    pageInfo: async parent => parent,
    totalCount: async ({ boardId }) => {
      return await prisma
        .postsConnection({
          where: {
            board: {
              id: boardId
            }
          }
        })
        .aggregate()
        .count();
    }
  },
  PostPageInfo: {
    startCursor: async ({ cursor, boardId }) => {
      const postExists = await prisma.$exists.post({
        board: { id: boardId },
        createdAt_lt: cursor
      });
      if (postExists) {
        const posts = await prisma.posts({
          where: {
            board: { id: boardId },
            createdAt_lt: cursor
          },
          orderBy: "createdAt_DESC"
        });
        return posts[0].createdAt;
      } else {
        return null;
      }
    },
    endCursor: async ({ cursor, boardId, offset }) => {
      const posts = await prisma.posts({
        where: {
          board: { id: boardId },
          createdAt_lt: cursor
        },
        first: offset,
        orderBy: "createdAt_DESC"
      });
      if (posts.length > 0) {
        return posts[posts.length - 1].createdAt;
      } else {
        return null;
      }
    },
    hasNextPage: async ({ cursor, boardId, offset }) => {
      return (
        (await prisma
          .postsConnection({
            where: {
              createdAt_lt: cursor,
              board: { id: boardId }
            }
          })
          .aggregate()
          .count()) > offset
      );
    },
    hasPreviousPage: async ({ boardId, cursor }) => {
      return await prisma.$exists.post({
        createdAt_gte: cursor,
        board: { id: boardId }
      });
    }
  }
};
export default query;
