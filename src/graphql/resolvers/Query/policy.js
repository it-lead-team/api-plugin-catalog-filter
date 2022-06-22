/**
 * @name policy
 * @method
 * @memberof GraphQL/Product
 * @summary Query the Policies collection for a single product
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Request input
 * @param {String} input.productId - Policy ID
 * @param {String} input.shopId - Shop ID
 * @returns {Promise<Object>} Product object Promise
 */
 export default async function policy(context, input) {

    const { collections } = context;
    const { Policies } = collections;
    const { policyId, shopId } = input;
  
    await context.validatePermissions(
      `reaction:legacy:policies:${policyId}`,
      "read",
      { shopId }
    );
  
    return Policies.findOne({
      _id: policyId,
      shopId
    });
  }
  