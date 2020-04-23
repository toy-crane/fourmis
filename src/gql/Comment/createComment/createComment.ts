import { prisma } from "../../../prismaClient";
import { IResolvers } from "graphql-tools";

const mutation: IResolvers = {
  Mutation: {
    createComment: async (_, { postId, text }, { user }) => {
      return prisma.comment.create({
        data: {
          text,
          user: {
            connect: {
              id: user.id
            }
          },
          post: {
            connect: { id: postId }
          }
        }
      });
    }
  }
};
export default mutation;
