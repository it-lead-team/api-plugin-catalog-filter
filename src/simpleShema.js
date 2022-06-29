import SimpleSchema from "simpl-schema";

/**
 * @name Filter
 * @memberof Schemas
 * @type {SimpleSchema}
 * @property {String} _id required
 * @property {String} title required
 * @property {String} value required
 * @property {String} createdAt required
 * @property {String} updatedAt required
 */
 

 export const Filter = new SimpleSchema({
  _id: String,
  tagIds: Array,
  title: String,
  values: Array,
  createdAt: String,
  updatedAt: String,
});


