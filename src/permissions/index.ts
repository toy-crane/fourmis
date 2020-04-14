import { shield } from "graphql-shield";
import { isAuthenticated } from "./rules";
export const permissions = shield(
  {
    Query: {
      currentUser: isAuthenticated,
      isLiked: isAuthenticated
    },
    Mutation: {
      createComment: isAuthenticated,
      togglePostLike: isAuthenticated
    }
  },
  { allowExternalErrors: true }
);
