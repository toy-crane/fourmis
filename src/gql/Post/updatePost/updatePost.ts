import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const mutation: IResolvers = {
  Mutation: {
    updatePost: async (_, { postId, content, title }, ctx: Context) => {
      const { user, prisma } = ctx;
      const post = await prisma.post.findOne({
        where: {
          id: postId,
        },
      });
      if (post.userId != user.id) {
        throw Error("is not your Post!");
      }
      return prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          title,
          content,
        },
      });
    },
  },
};
export default mutation;
