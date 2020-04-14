import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";

const query: IResolvers = {
  Comment: {
    CommentlikesCount: async (parent, _, { user }) => {
      const { id } = parent;
      return await prisma
        .commentLikesConnection({
          where: { comment: { id }, user: { id: user.id } }
        })
        .aggregate()
        .count();
    }
  }
};
export default query;
