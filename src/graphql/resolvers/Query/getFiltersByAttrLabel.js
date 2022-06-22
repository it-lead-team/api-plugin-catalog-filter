import getPaginatedResponse from "@reactioncommerce/api-utils/graphql/getPaginatedResponse.js";
import wasFieldRequested from "@reactioncommerce/api-utils/graphql/wasFieldRequested.js";
import { decodeTagOpaqueId } from "../../../xforms/id.js";
import collectFiltersByAttrLabel from "../../../utils/collectFiltersByAttrLabel";

/**
 * @name Query/getFilterByAttrLabel
 * @method
 * @memberof Policies/Query
 * @summary Query for a list of products
 * @param {Object} _ - unused
 * @param {Object} args - an object of all arguments that were sent by the client
 * @param {String} args.shopId - id of user to query
 * @param {String} args.opaqueTagId
 * @param {Object} context - an object containing the per-request state
 * @param {Object} info Info about the GraphQL request
 * @returns {Promise<Object>} Products
 */
export default async function getFiltersByAttrLabel(_, args, context, info) {
  // console.log(tagIds)
  const {
    tagIds: opaqueTagIds,
    // shopIds: opaqueShopIds,
    // query: queryString,
    ...connectionArgs
  } = args;

  const tagIds = opaqueTagIds && opaqueTagIds.map(decodeTagOpaqueId);

  // console.log(tagIds)

  // const query = await context.queries.getFiltersByAttrLabel(context, {
  //   tagIds
  // });

  const query = await context.queries.catalogItems(context, {
    tagIds: tagIds
  });
 
  const { nodes } = await getPaginatedResponse(query, connectionArgs, {
    includeHasNextPage: wasFieldRequested("pageInfo.hasNextPage", info),
    includeHasPreviousPage: wasFieldRequested("pageInfo.hasPreviousPage", info),
    includeTotalCount: wasFieldRequested("totalCount", info)
  });

  const products = nodes.map((el) => {
    return el.product
  });

  return {filter: JSON.stringify(await collectFiltersByAttrLabel(products))};
  // return getPaginatedResponse(query, connectionArgs, {
  //   includeHasNextPage: wasFieldRequested("pageInfo.hasNextPage", info),
  //   includeHasPreviousPage: wasFieldRequested("pageInfo.hasPreviousPage", info),
  //   includeTotalCount: wasFieldRequested("totalCount", info)
  // });
}
