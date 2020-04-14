import { IResolvers } from "graphql-tools";
import { prisma } from "../../../../generated/prisma-client";

const query: IResolvers = {
  Query: {
    comments: async (
      _,
      { postId, cursor = new Date().toISOString(), offset = 10 }
    ) => ({
      postId,
      cursor,
      offset
    })
  },
  CommentsConnection: {
    edges: async parent => {
      const { postId, cursor, offset } = parent;
      const comments = await prisma.comments({
        where: {
          post: { id: postId },
          createdAt_lt: cursor
        },
        first: offset,
        orderBy: "createdAt_DESC"
      });
      const commentEdges = comments.map(comment => ({
        cursor: comment.createdAt,
        node: comment
      }));
      return commentEdges;
    },
    pageInfo: async parent => parent,
    totalCount: async parent => {
      const { postId } = parent;
      return await prisma
        .commentsConnection({
          where: {
            post: {
              id: postId
            }
          }
        })
        .aggregate()
        .count();
    }
  },
  CommentPageInfo: {
    startCursor: async parent => {
      const { cursor, postId } = parent;
      const commentExists = await prisma.$exists.comment({
        post: { id: postId },
        createdAt_lt: cursor
      });
      if (commentExists) {
        const comments = await prisma.comments({
          where: {
            post: { id: postId },
            createdAt_lt: cursor
          },
          orderBy: "createdAt_DESC"
        });
        return comments[0].createdAt;
      } else {
        return null;
      }
    },
    endCursor: async parent => {
      const { cursor, postId, offset } = parent;
      const comments = await prisma.comments({
        where: {
          post: { id: postId },
          createdAt_lt: cursor
        },
        first: offset,
        orderBy: "createdAt_DESC"
      });
      if (comments.length > 0) {
        return comments[comments.length - 1].createdAt;
      } else {
        return null;
      }
    },
    hasNextPage: async parent => {
      const { cursor, postId, offset } = parent;
      return (
        (await prisma
          .commentsConnection({
            where: {
              createdAt_lt: cursor,
              post: { id: postId }
            }
          })
          .aggregate()
          .count()) > offset
      );
    },
    hasPreviousPage: async parent => {
      const { cursor, postId } = parent;
      return await prisma.$exists.comment({
        createdAt_gte: cursor,
        post: { id: postId }
      });
    }
  }
};
export default query;
