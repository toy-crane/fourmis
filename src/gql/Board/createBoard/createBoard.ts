import { prisma } from "../../../../generated/prisma-client";
import { IResolvers } from "graphql-tools";
import { BOARD_FRAGMENT } from "../../../fragment";

const mutation: IResolvers = {
  Mutation: {
    createBoard: async (_, { productId }, ctx, info) => {
      return await prisma
        .createBoard({
          product: {
            connect: {
              id: productId
            }
          }
        })
        .$fragment(BOARD_FRAGMENT);
    }
  }
};
export default mutation;
