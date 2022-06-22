// tag
import ReactionError from "@reactioncommerce/reaction-error";
import { getVariantQuery } from "../util/getVariantQuery.js";

/**
 * @name filterByAttrLable
 * @method
 * @memberof PublishedProduct/NoMeteorQueries
 * @summary Query the Orders collection for an order with the provided order referenceId
 * @param {Object} context - an object containing the per-request state
 * @param {Object} params - request parameters
 * @param {String} params.orderReferenceId - Order reference ID
 * @param {String} params.shopId - Shop ID for the shop that owns the order
 * @param {String} [params.token] - Anonymous order token
 * @returns {Promise<Object>|undefined} - An Order document, if one is found
 */
export default async function filterByAttrLabel(context, { tagId, optionTitles } = {}) {
  if (!tagId ) {
    throw new ReactionError("invalid-param", "You must provide tagId");
  }

  return getVariantQuery(context,  tagId, optionTitles);
}
