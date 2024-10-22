import { client } from "$services/redis";
import { itemsKey, itemsByViewsKey } from "$services/keys";
import { deserialize } from "./deserialize";

export const itemsByViews = async (
    order: "DESC" | "ASC" = "DESC",
    offset = 0,
    count = 10
) => {
    let results: any = await client.sort(itemsByViewsKey(), {
        GET: [
            "#",
            `${itemsKey("*")}->name`,
            `${itemsKey("*")}->views`,
            `${itemsKey("*")}->endingAt`,
            `${itemsKey("*")}->imageUrl`,
            `${itemsKey("*")}->price`,
        ],
        BY: "score",
        DIRECTION: order,
        LIMIT: {
            offset: offset,
            count: count,
        },
    });

    const items = [];

    /*
    *
    *
    * Uderstanding this code:
    *   [
        '91fdf6', 'Chair', '25', '1729520486331', 'https://realrealreal-redis.s3.amazonaws.com/4.jpg', '0',
        'bfdc60', 'coutch', '1', '1729106535253', 'https://realrealreal-redis.s3.amazonaws.com/51.jpg', '0',
        '967898', 'Chair', '1', '1729106525749', 'https://realrealreal-redis.s3.amazonaws.com/30.jpg', '0',
        '8110cf', 'table', '1', '1729106543084', 'https://realrealreal-redis.s3.amazonaws.com/8.jpg', '0'
        ]

        Each item (or object) you're trying to create needs 6 pieces of information. For example:

        id = '91fdf6'
        name = 'Chair'
        views = '25'
        endingAt = '1729520486331'
        imageUrl = 'https://realrealreal-redis.s3.amazonaws.com/4.jpg'
        price = '0'
        So the loop is trying to take these 6 values and make an object out of them, and then repeat for the next 6 values.

    */
    while (results.length) {
        const [id, name, views, endingAt, imageUrl, price, ...rest] = results;

        const item = deserialize(id, {
            name,
            views,
            endingAt,
            imageUrl,
            price,
        });
        items.push(item);

        results = rest;
    }

    return items;
};
