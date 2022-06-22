import { decodeShopOpaqueId } from "../../xforms/id.js";

/**
 *
 * @method addPolicy
 * @summary initializes empty product template, with empty variant
 * @param {Object} _ - unused
 * @param {Object} args - The input arguments
 * @param {Object} args.input - mutation input object
 * @param {String} [args.input.clientMutationId] - The mutation id
 * @param {String} [args.input.policy] - policy data
 * @param {String} args.input.shopId - shopId of shop to create product for
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} createProduct payload
 */
export default async function addPolicy(_, { input }, context) {
  const {
    clientMutationId = null,
    policy: policyInput,
    shopId,
  } = input;

  const policy = await context.mutations.addPolicy(context, {
    policy: policyInput,
    shopId: decodeShopOpaqueId(shopId),
  });

  return {
    clientMutationId,
    policy
  };
}
