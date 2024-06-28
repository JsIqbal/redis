import "dotenv/config";
import { client } from "../src/services/redis";

const run = async () => {
    const key = "company";

    await client.hSet("company1", {
        name: "iq",
        industry: "tech",
        age: "12.3",
        estd: "1965",
        a: "10.5",
    });

    await client.hSet("company2", {
        name: "iq",
        industry: "tech",
        age: "12.3",
        estd: "1965",
        a: "10.5",
    });

    await client.hSet("company3", {
        name: "iq",
        industry: "tech",
        age: "12.3",
        estd: "1965",
        a: "10.5",
    });

    const commands = [1, 2, 3].map((id) => {
        return client.hGetAll(`company${id}`);
    });

    console.log("----commands----", commands);

    const exists = await Promise.all(commands);
    console.log("----commands----", commands);

    if (Object.keys(exists).length === 0) {
        console.log("404: NOT FOUND!");

        return;
    }

    console.log(exists);
};

run();
