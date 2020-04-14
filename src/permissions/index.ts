import { shield } from "graphql-shield";
import { isAuthenticated } from "./rules";
export const permissions = shield(
  {
    Query: {
      currentUser: isAuthenticated
    },
    Mutation: {
      createComment: isAuthenticated,
      toggleLike: isAuthenticated
    }
  },
  { allowExternalErrors: true }
);
