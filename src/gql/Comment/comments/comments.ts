import { IResolvers } from "graphql-tools";
import { prisma } from "../../../prismaClient";

const query: IResolvers = {
  CommentsConnection: {
    edges: async parent => {
      const { postId, cursor, offset } = parent;
      const comments = await prisma.comment.findMany({
        where: {
          post: { id: postId },
          createdAt: { lt: cursor }
        },
        first: offset,
        orderBy: { createdAt: "desc" }
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
      const count = await prisma.comment.count({
        where: {
          post: {
            id: postId
          }
        }
      });
      return count;
    }
  },
  CommentPageInfo: {
    startCursor: async parent => {
      const { cursor, postId } = parent;
      const comments = await prisma.comment.findMany({
        where: {
          post: { id: postId },
          createdAt: { lt: cursor }
        }
      });
      if (comments.length > 0) {
        const comments = await prisma.comment.findMany({
          where: {
            post: { id: postId },
            createdAt: { lt: cursor }
          },
          orderBy: { createdAt: "desc" }
        });
        return comments[0].createdAt;
      } else {
        return null;
      }
    },
    endCursor: async parent => {
      const { cursor, postId, offset } = parent;
      const comments = await prisma.comment.findMany({
        where: {
          post: { id: postId },
          createdAt: { lt: cursor }
        },
        first: offset,
        orderBy: { createdAt: "desc" }
      });
      if (comments.length > 0) {
        return comments[comments.length - 1].createdAt;
      } else {
        return null;
      }
    },
    hasNextPage: async parent => {
      const { cursor, postId, offset } = parent;
      return await prisma.comment.count({
        where: {
          createdAt: { lt: cursor },
          post: { id: postId }
        }
      });
    },
    hasPreviousPage: async parent => {
      const { cursor, postId } = parent;
      const comments = await prisma.comment.findMany({
        where: {
          createdAt: { gte: cursor },
          post: { id: postId }
        }
      });
      return comments.length > 0 ? true : false;
    }
  }
};
export default query;
