
import ReactionError from "@reactioncommerce/reaction-error";
import collectFiltersByAttrLabel from "../..//utils/collectFiltersByAttrLabel.js"

/**
 * @name filterByAttrLable
 * @method
 * @memberof PublishedProduct/NoMeteorQueries
 * @summary Query the Orders collection for an order with the provided order referenceId
 * @param {Object} context - an object containing the per-request state
 * @param {Object} params - request parameters
 * @param {String} params.tagId - Order reference ID
 * @returns {Promise<Object>|undefined} - An Order document, if one is found
 */
export default async function getFiltersByAttrLabel(context, { tagIds} = {}) {
  const {Filters} = context.collections;
  
  if (!tagIds) {
    throw new ReactionError("invalid-param", "You must provide tagIds");
  }

  return await Filters.find({tagIds: {$in: tagIds}});
}
