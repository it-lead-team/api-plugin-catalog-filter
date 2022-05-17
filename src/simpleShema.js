import SimpleSchema from "simpl-schema";

/**
 * @name History
 * @memberof Schemas
 * @type {SimpleSchema}
 * @property {String} accountId required
 * @property {String} email required
 * @property {String} status required
 * @property {String} createdAt required
 * @property {String} updatedAt required
 */
 export const History = new SimpleSchema({
    _id: String,
    accountId: String,
    referenceId: String,
    userId: String,
    updatedAt: Date,
    userIP: String,
  });