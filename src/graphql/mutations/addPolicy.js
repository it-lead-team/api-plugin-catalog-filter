import SimpleSchema from "simpl-schema";
import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";
import cleanProductInput from "../utils/cleanProductInput.js";

const inputSchema = new SimpleSchema({
  title: String,
  description: String,
  type: String,
  shopId: String,
});

/**
 * @method addPolicy
 * @summary creates an empty product, with an empty variant
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Input arguments for the operation
 * @param {String} [input.policy] - product data
 * @param {Boolean} [input.shouldCreateFirstVariant=true] - Auto-create one variant for the product
 * @param {String} input.shopId - the shop to create the product for
 * @return {String} created productId
 */
export default async function createProduct(context, input) {
  inputSchema.validate(input);

  const { appEvents, collections, simpleSchemas } = context;
  const { Policy } = simpleSchemas;
  const { Policies } = collections;
  const { policy: policyInput, shopId } = input;

  // Check that user has permission to create product
  await context.validatePermissions("reaction:legacy:policies", "create", { shopId });

  const newPolicyId = (policyInput && policyInput._id) || Random.id();

  const createdAt = new Date();
  const newPolicy = {
    _id: newPolicyId,
    createdAt,
    shopId,
    title,
    description,
    type,
    updatedAt: createdAt,
    // ...initialProductData
  };

//   // Apply custom transformations from plugins.
//   for (const customFunc of context.getFunctionsOfType("mutateNewProductBeforeCreate")) {
//     // Functions of type "mutateNewProductBeforeCreate" are expected to mutate the provided variant.
//     // We need to run each of these functions in a series, rather than in parallel, because
//     // we are mutating the same object on each pass.
//     // eslint-disable-next-line no-await-in-loop
//     await customFunc(newProduct, { context });
//   }

  Policy.validate(newPolicy);

  await Policies.insertOne(newPolicy);

  return newPolicy;
}
