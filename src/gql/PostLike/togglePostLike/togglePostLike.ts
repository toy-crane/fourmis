import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const mutation: IResolvers = {
  Mutation: {
    togglePostLike: async (_, { postId }, ctx: Context) => {
      const { user, prisma } = ctx;
      const filterOptions = {
        post: { id: postId },
        user: { id: user.id },
      };
      const postLikes = await prisma.postLike.findMany({
        where: filterOptions,
      });
      if (postLikes.length > 0) {
        await prisma.postLike.deleteMany({ where: filterOptions });
      } else {
        await prisma.postLike.create({
          data: {
            post: {
              connect: {
                id: postId,
              },
            },
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        });
      }
      return true;
    },
  },
};
export default mutation;
