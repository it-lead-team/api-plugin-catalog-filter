
export default async function collectFiltersByAttrLabel(products) {

   const filters = {};

    for (const product of products) {
        for (const variant of product[`variants`]) {
            filters[variant.attributeLabel] = 
                filters[variant.attributeLabel] &&  filters[variant.attributeLabel].add(variant.optionTitle) || new Set([variant.optionTitle])
        }
    }

    for (const key in filters) {
        filters[key] = Array.from(filters[key])
    }

    return filters;
}