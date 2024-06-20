import "dotenv/config";
import { client } from "../src/services/redis";

const run = async () => {
    const key = "company";

    await client.hSet("company", {
        name: "iq",
        industry: "tech",
        age: "12.3",
        estd: "1965",
        a: "10.5",
    });

    const exists = await client.hGetAll(key);

    if (Object.keys(exists).length === 0) {
        console.log("404: NOT FOUND!");

        return;
    }

    console.log(exists);
};

run();
