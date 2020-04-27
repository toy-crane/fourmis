import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const mutation: IResolvers = {
  Mutation: {
    createPost: async (_, { boardId, content, title }, ctx: Context) => {
      const { user, prisma } = ctx;
      return prisma.post.create({
        data: {
          board: {
            connect: {
              id: boardId,
            },
          },
          user: { connect: { id: user.id } },
          title,
          content,
        },
      });
    },
  },
};
export default mutation;
