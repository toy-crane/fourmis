import { shield } from "graphql-shield";
import { isAuthenticated } from "./rules";
export const permissions = shield(
  {
    Query: {
      currentUser: isAuthenticated
    },
    Mutation: {
      createComment: isAuthenticated,
      togglePostLike: isAuthenticated,
      toggleCommentLike: isAuthenticated,
      createPost: isAuthenticated
    }
  },
  { allowExternalErrors: true }
);
