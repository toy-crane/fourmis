import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import { typeDefs, resolvers } from "graphql-scalars";
import * as path from "path";

const allTypes = fileLoader(path.join(__dirname, "/gql/**/*.gql"));
const allResolvers = fileLoader(path.join(__dirname, "/gql/**/*.ts"));
const schema = makeExecutableSchema({
  typeDefs: [...typeDefs, mergeTypes(allTypes)],
  resolvers: { ...resolvers, ...mergeResolvers(allResolvers) }
});

export default schema;
