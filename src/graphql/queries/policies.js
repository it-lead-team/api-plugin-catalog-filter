import applyPolicyFilters from "../utils/applyPolicyFilters.js";

/**
 * @name policies
 * @method
 * @memberof GraphQL/Policies
 * @summary Query the Products collection for a list of products
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Request input
 * @param {String[]} [policyIds] - List of product IDs to filter by
 * @param {String} [query] - Regex match query string
 * @param {String[]} shopIds - List of shop IDs to filter by
 * @returns {Promise<Object>} Products object Promise
 */
export default async function products(context, input) {
  const { collections } = context;
  const { Policies } = collections;
  const policyFilters = input;

  // Check the permissions for all shops requested
  await Promise.all(policyFilters.shopIds.map(async (shopId) => {
    await context.validatePermissions("reaction:legacy:policies", "read", { shopId });
  }));

  // Create the mongo selector from the filters
  const selector = applyPolicyFilters(context, policyFilters);

  // Get the first N (limit) top-level products that match the query
  return Policies.find(selector);
}
