import { usersKey } from "$services/keys";
import { client } from "$services/redis";
import type { CreateUserAttrs } from "$services/types";
import { genId } from "$services/utils";

export const getUserByUsername = async (username: string) => {};

export const getUserById = async (id: string) => {};

export const createUser = async (attrs: CreateUserAttrs) => {
    const id = genId();

    await client.hSet(usersKey(id), {
        username: attrs.username,
        password: attrs.password,
    });

    return id;
};
