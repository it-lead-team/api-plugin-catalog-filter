import decodeOpaqueIdForNamespace from "@reactioncommerce/api-utils/decodeOpaqueIdForNamespace.js";
import encodeOpaqueId from "@reactioncommerce/api-utils/encodeOpaqueId.js";

const namespaces = {
  Tag: "reaction/tag",
};


export const encodeTagOpaqueId = encodeOpaqueId(namespaces.Tag);
export const decodeTagOpaqueId = decodeOpaqueIdForNamespace(namespaces.Tag);
