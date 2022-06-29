import { createRequire } from "module";
import schemas from "./graphql/schemas/index.js";
import resolvers from "./graphql/resolvers/index.js";
import queries from "./graphql/queries/index.js";
import collectFiltersByAttrLabel from "./utils/collectFiltersByAttrLabel.js";
const require = createRequire(import.meta.url);
const pkg = require("../package.json");

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
    collections: {
      Filters: {
        name: "Filters",
        indexes: [
          // Without _id: 1 on these, they cannot be used for sorting by createdAt
          // because all sorts include _id: 1 as secondary sort to be fully stable.
          [{tagIds: 1, title:1 }, {unique: true}],
          [{ createdAt: 1, _id: 1 }],
          [{ updatedAt: 1, _id: 1 }],
        ]
      }
    },
    graphQL: {
      resolvers,
      schemas
    },
    queries,
    functionsByType: {
      startup: [collectFiltersByAttrLabel],
    },
  });
}
