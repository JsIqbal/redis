import { itemsKey, userLikesKey } from "$services/keys";
import { client } from "$services/redis";
import { getItems } from "./items";

export const userLikesItem = async (itemId: string, userId: string) => {
    return client.sIsMember(userLikesKey(userId), itemId);
};

export const likedItems = async (userId: string) => {
    const ids = await client.sMembers(userLikesKey(userId));

    return getItems(ids);
};

export const likeItem = async (itemId: string, userId: string) => {
    const inserted = await client.sAdd(userLikesKey(userId), itemId);

    if (inserted) {
        return client.hIncrBy(itemsKey(itemId), "likes", 1);
    }
};

export const unlikeItem = async (itemId: string, userId: string) => {
    const discarded = await client.sRem(userLikesKey(userId), itemId);

    if (discarded) {
        return client.hIncrBy(itemsKey(itemId), "likes", -1);
    }
};

export const commonLikedItems = async (
    userOneId: string,
    userTwoId: string
) => {};
