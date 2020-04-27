import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const mutation: IResolvers = {
  Mutation: {
    createComment: async (_, { postId, text }, ctx: Context) => {
      const { prisma, user } = ctx;
      return prisma.comment.create({
        data: {
          text,
          user: {
            connect: {
              id: user.id,
            },
          },
          post: {
            connect: { id: postId },
          },
        },
      });
    },
  },
};
export default mutation;
