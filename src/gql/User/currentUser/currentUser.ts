import { IResolvers } from "graphql-tools";
const query: IResolvers = {
  Query: {
    currentUser: async (_, __, { user }) => {
      return user;
    }
  }
};

export default query;
