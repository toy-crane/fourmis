import { shield } from "graphql-shield";
import { isAuthenticated } from "./rules";
export const permissions = shield(
  {
    Query: {
      currentUser: isAuthenticated,
      isPostLiked: isAuthenticated
    },
    Mutation: {
      createComment: isAuthenticated,
      togglePostLike: isAuthenticated,
      createPost: isAuthenticated
    }
  },
  { allowExternalErrors: true }
);
