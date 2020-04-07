import { IResolvers } from "graphql-tools";
const query: IResolvers = {
  Query: {
    currentUser: async (_, __, { request, user }, info) => {
      return user;
    }
  }
};

export default query;
