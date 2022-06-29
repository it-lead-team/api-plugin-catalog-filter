import Random from "@reactioncommerce/random";
import Logger from "@reactioncommerce/logger";


/**
 * @param {Object} context App context
 * @returns {undefined}
 */
export default async function collectFiltersByAttrLabel(context) {
  
  
  // After publish product event create or remove filters from db 
  // by attrLabel and optionTitle field
  context.appEvents.on(
    "afterPublishProductToCatalog",
    async ({ catalogProduct }) => {
      const { Filters } = context.collections;
      const filters = {};
      const optionTitles = [];
      function collectOptions(options) {
        if (options) {
          for (const option of options) {
            filters[option.attributeLabel] =
              (filters[option.attributeLabel] &&
                filters[option.attributeLabel].add(option.optionTitle)) ||
              new Set([option.optionTitle]);
            if (option.options) {
              return collectOptions(option.options);
            }
          }
        } else {
          return filters;
        }
      }

      const { _id: catalogProductId, variants } = catalogProduct;
      if (!catalogProduct.tagIds) {
        Logger.error("You should assign tag to product first");
        return;
      }

      for (const variant of variants) {
        filters[variant.attributeLabel] =
          (filters[variant.attributeLabel] &&
            filters[variant.attributeLabel].add(variant.optionTitle)) ||
          new Set([variant.optionTitle]);
        collectOptions(variant.options);
      }

      if (!catalogProduct.isDeleted || !catalogProduct.isVisible) {
        for (const key in filters) {
          optionTitles.push(...filters[key]);
        }

        const { Catalog, pipeline } = await context.queries.catalogItems(
          context,
          {
            tagIds: catalogProduct.tagIds,
            optionTitles,
          }
        );

        const hasProductToFilter = await Catalog.aggregate(pipeline).toArray();
        if (!hasProductToFilter.length) {
          for (const key in filters) {
            const filter = {
              tagIds: catalogProduct.tagIds,
              title: key,
              values: filters[key],
            };
            
            // Delete hidden catalog products optionTitles from filter
            await Filters.updateOne(
              { title: filter.title, tagIds: filter.tagIds },
              { $pull: { values: { $in: Array.from(filters[key]) } } },
              { returnOriginal: true }
            );
          }

          // Delete documents with empty values from filters 
          await Filters.deleteMany(
            { values: {$size: 0}},
          );
          return;
        }
      }

      for (const key in filters) {
        const filter = {
          _id: Random.id(),
          tagIds: catalogProduct.tagIds,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          title: key,
          values: filters[key],
        };
        await Filters.updateOne(
          { title: filter.title, tagIds: filter.tagIds },
          { $addToSet: { values: { $each: Array.from(filters[key]) } } },
          { upsert: true }
        );
      }
    }
  );
}
