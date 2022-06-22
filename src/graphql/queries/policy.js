/**
 * @name policy
 * @method
 * @memberof GraphQL/Policy
 * @summary Query the Products collection for a single product
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Request input
 * @param {String} input.policyId - Product ID
 * @param {String} input.shopId - Shop ID
 * @returns {Promise<Object>} Product object Promise
 */
 export default async function product(context, input) {
    const { collections } = context;
    const { Policies } = collections;
    const { policyId, shopId } = input;
  
    await context.validatePermissions(
      `reaction:legacy:products:${policyId}`,
      "read",
      { shopId }
    );
  
    return Policies.findOne({
      _id: policyId,
      shopId
    });
  }
  