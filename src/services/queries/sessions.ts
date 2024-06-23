import { sessionsKey } from "$services/keys";
import { client } from "$services/redis";
import type { Session } from "$services/types";

export const getSession = async (id: string) => {
    const session = await client.hGetAll(sessionsKey(id));

    if (Object.keys(session).length === 0) {
        return null;
    }

    return deserialize(id, session);
};

export const saveSession = async (session: Session) => {
    return client.hSet(sessionsKey(session.id), serialize(session));
};

const deserialize = (id: string, session: { [key: string]: string }) => {
    return {
        id,
        userId: session.userId,
        username: session.username,
    };
};

const serialize = (session: Session) => {
    return {
        userId: session.userId,
        username: session.username,
    };
};
