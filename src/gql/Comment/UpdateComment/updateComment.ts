import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const mutation: IResolvers = {
  Mutation: {
    updateComment: async (_, { commentId, text }, ctx: Context) => {
      const { prisma, user } = ctx;
      const comment = await prisma.comment.findOne({
        where: {
          id: commentId,
        },
      });
      if (comment.userId != user.id) {
        throw Error("is not your Comment!");
      }
      return prisma.comment.update({
        where: { id: commentId },
        data: {
          text,
        },
      });
    },
  },
};
export default mutation;
