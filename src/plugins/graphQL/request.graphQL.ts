import { GraphQLClient } from "graphql-request";

export const graphqlRequestClient = new GraphQLClient(
    "http://localhost:3006/graphql", {
  }
);
  