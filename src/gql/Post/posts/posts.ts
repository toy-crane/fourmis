import { IResolvers } from "graphql-tools";
import { prisma } from "../../../../generated/prisma-client";

const query: IResolvers = {
  Query: {
    posts: async (
      _,
      { boardId, cursor = new Date().toISOString(), offset = 10 }
    ) => ({
      boardId,
      cursor,
      offset
    })
  },
  PostsConnection: {
    edges: async parent => {
      const { boardId, cursor, offset } = parent;
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
    totalCount: async parent => {
      const { boardId } = parent;
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
    startCursor: async parent => {
      const { cursor, boardId } = parent;
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
    endCursor: async parent => {
      const { cursor, boardId, offset } = parent;
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
    hasNextPage: async parent => {
      const { cursor, boardId, offset } = parent;
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
    hasPreviousPage: async parent => {
      const { cursor, boardId } = parent;
      return await prisma.$exists.post({
        createdAt_gte: cursor,
        board: { id: boardId }
      });
    }
  }
};
export default query;
