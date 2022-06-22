import SimpleSchema from "simpl-schema";
import ReactionError from "@reactioncommerce/reaction-error";
import cleanProductInput from "../utils/cleanProductInput.js";

const inputSchema = new SimpleSchema({
  product: {
    type: Object,
    blackbox: true,
    optional: true
  },
  productId: String,
  shopId: String
});

/**
 * @method updatePolicy
 * @summary Updates a product
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} input - Input arguments for the bulk operation
 * @param {String} input.field - product field to update
 * @param {String} input.policyId - productId of product to update
 * @param {String} input.shopId - shopId of shop product belongs to
 * @param {String} input.value - value to update field with
 * @return {Promise<Object>} updateProduct payload
 */
export default async function updateProduct(context, input) {
  inputSchema.validate(input);

  const { appEvents, collections, simpleSchemas } = context;
  const { Policy } = simpleSchemas;
  const { Policies } = collections;
  const { policy: policyInput, policyId, shopId } = input;

  // Check that user has permission to create product
  await context.validatePermissions(
    `reaction:legacy:policies:${policyId}`,
    "update",
    { shopId }
  );

  const currentPolicy = await Policies.findOne({ _id: policyId, shopId });
  if (!currentPolicy) throw new ReactionError("not-found", "Policy not found");

  const updateDocument = {
    policyId,
    policyInput,
    shopId
  };

  if (Object.keys(updateDocument).length === 0) {
    throw new ReactionError("invalid-param", "At least one field to update must be provided");
  }

  updateDocument.updatedAt = new Date();

  const modifier = { $set: updateDocument };

  Policy.validate(modifier, { modifier: true });

  const { value: updatedPolicy } = await Policies.findOneAndUpdate(
    {
      _id: policyId,
      shopId
    },
    modifier,
    {
      returnOriginal: false
    }
  );

  // await appEvents.emit("afterProductUpdate", { policyId, policy: updatedProduct });

  return updatedPolicy;
}
