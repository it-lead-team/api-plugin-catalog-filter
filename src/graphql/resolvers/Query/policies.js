import getPaginatedResponse from "@reactioncommerce/api-utils/graphql/getPaginatedResponse.js";
import wasFieldRequested from "@reactioncommerce/api-utils/graphql/wasFieldRequested.js";
import { decodePolicyOpaqueId, decodeShopOpaqueId } from "../../xforms/id.js";

/**
 * @name Query/policies
 * @method
 * @memberof Policies/Query
 * @summary Query for a list of products
 * @param {Object} _ - unused
 * @param {Object} args - an object of all arguments that were sent by the client
 * @param {String} args.shopId - id of user to query
 * @param {Object} context - an object containing the per-request state
 * @param {Object} info Info about the GraphQL request
 * @returns {Promise<Object>} Products
 */
export default async function policies(_, args, context, info) {
  const {
    policyIds: opaquePolicyIds,
    shopIds: opaqueShopIds,
    query: queryString,
  } = args;

  const shopIds = opaqueShopIds.map(decodeShopOpaqueId);
  const policyIds = opaquePolicyIds && opaquePolicyIds.map(decodePolicyOpaqueId);

  const query = await context.queries.products(context, {
    policyIds,
    shopIds,
    query: queryString,
  });

  return getPaginatedResponse(query, connectionArgs, {
    includeHasNextPage: wasFieldRequested("pageInfo.hasNextPage", info),
    includeHasPreviousPage: wasFieldRequested("pageInfo.hasPreviousPage", info),
    includeTotalCount: wasFieldRequested("totalCount", info)
  });
}
