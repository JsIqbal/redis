import { client } from "$services/redis";
import { itemsKey, itemsByViewsKey } from "$services/keys";

export const itemsByViews = async (
    order: "DESC" | "ASC" = "DESC",
    offset = 0,
    count = 10
) => {
    const results = await client.sort(itemsByViewsKey(), {
        GET: ["#", `${itemsKey("*")}->name`, `${itemsKey("*")}->views`],
        BY: "score",
        DIRECTION: order,
        LIMIT: {
            offset: offset,
            count: count,
        },
    });

    console.log(results);
};
