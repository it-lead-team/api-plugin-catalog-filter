import SimpleSchema from "simpl-schema";

/**
 * @name Policy
 * @memberof Schemas
 * @type {SimpleSchema}
 * @property {String} accountId required
 * @property {String} email required
 * @property {String} status required
 * @property {String} createdAt required
 * @property {String} updatedAt required
 */
 

 export const Filter = new SimpleSchema({
  _id: String,
  // accountId: String,
  // userId: String,
  // updatedAt: Date,
  title: String,
  value: Array,
  // description: String,
  // shopId: String,
  // createdAt: String,
  // updateAt: String,
});


