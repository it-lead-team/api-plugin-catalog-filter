import { createRequire } from "module";
import schemas from "./graphql/schemas/index.js";
import resolvers from "./graphql/resolvers/index.js";
import queries from "./graphql/queries/index.js";
const require = createRequire(import.meta.url);
const pkg = require("../package.json");

// import {
//   Policy,
// } from "./simpleSchemas.js";

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {Object} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: pkg.label,
    name: pkg.name,
    version: pkg.version,
    // collections: {
    //   Policies: {
    //     name: "Policies",
    //   }
    // },
    graphQL: {
      resolvers,
      schemas
    },
    // mutations,
    queries,
    // functionsByType: {
    //   createHistoryRecord: [createHistoryRecord],
    // },
    // simpleSchemas: {
    //   Policy,
    // }
  });
}
