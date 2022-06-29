
import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @name filterByAttrLable
 * @method
 * @memberof Filter/NoMeteorQueries
 * @summary Query the filterByAttrLabel collection for an filter with the provided catalog tagIds
 * @param {Object} context - an object containing the per-request state
 * @param {Object} params - request parameters
 * @param {String} params.tagId - tagIds of catalog of products
 * @returns {Promise<MongoCursor>} - A MongoDB cursor for the proper query
 */
export default async function getFiltersByAttrLabel(context, { tagIds} = {}) {
  const {Filters} = context.collections;

  if (!tagIds) {
    throw new ReactionError("invalid-param", "You must provide tagIds");
  }

  return await Filters.find({tagIds: {$in: tagIds}});
}
