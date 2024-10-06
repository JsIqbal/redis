import { usersKey, usernamesUniqueKey, usernamesKey } from "$services/keys";
import { client } from "$services/redis";
import type { CreateUserAttrs } from "$services/types";
import { genId } from "$services/utils";

export const getUserByUsername = async (username: string) => {};

export const getUserById = async (id: string) => {
    const user = await client.hGetAll(usersKey(id));

    return deserialize(id, user);
};

export const createUser = async (attrs: CreateUserAttrs) => {
    const id = genId();

    const exists = await client.sIsMember(usernamesUniqueKey(), attrs.username);
    if (exists) throw new Error("Username Already Taken!");

    await client.hSet(usersKey(id), serialize(attrs));
    await client.sAdd(usernamesUniqueKey(), attrs.username);
    await client.zAdd(usernamesUniqueKey(), {
        value: attrs.username,
        score: parseInt(id, 16), // we converted a base 16 to a base 10 by implementing the parInt function
    });

    return id;
};

const serialize = (user: CreateUserAttrs) => {
    return {
        username: user.username,
        password: user.password,
    };
};

const deserialize = (id: string, user: { [key: string]: string }) => {
    return {
        id,
        username: user.username,
        password: user.password,
    };
};
