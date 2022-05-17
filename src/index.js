import { createRequire } from "module";
import createHistoryRecord from "./utils/createHistoryRecord.js";
import schemas from "./graphql/schemas/index.js";
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
      HistoryTags: {
        name: "HistoryTags",
      }
    },
    graphQL: {
      schemas,
    },
    functionsByType: {
      createHistoryRecord: [createHistoryRecord],
    },
  });
}
