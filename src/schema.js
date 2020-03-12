// There is lot of graphql and resolvers files
// And They will be combined from here
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

// Must not add files that isn't graphql or resolvers
const allTypes = fileLoader(path.join(__dirname, "./api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "./api/**/*.js"));

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});

export default schema;
