# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte@next

# create a new project in my-app
npm init svelte@next my-app
```

> Note: the `@next` is temporary

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

---

### Section 1: Get started here

-   redis is a database faster than treditional databases.
-   redis is faster because it uses the ram.
-   radis stores data in simple data structures.
-   redis has a small number of feature set

#### Instructions:

-   create a redis in redis.com
-   create a free subscription
-   create a new database
-   connect the database in rbook.cloud

##### Simple command testing:

```bash
    SET key value
```

---

### Section 2: Commands for Adding and Querying data

#### Strings:

-   set string:

```bash
SET message "Hellow World!"
```

-   get string:

```bash
GET message
```

-   Check out the commands from redis official docs
-   see the diagrams in section 2
-   `GET`: get a value using key: `GET message`
-   `NX`: create if the key doesn't exist yet : `SET color blue NX / SETNX color blue`
-   `EX`: remove the record after limit time : `SETEX message 2 "Hello World!"`
-   `MSET`: multiple set values for keys : `MSETNX colofgsdr blue moshfdel toyota`
-   `MGET`: multiple get values for keys : `MGET colofgsdr moshfdel`
-   `DEL`: deletes the key: `DEL message`
-   `GETRANGE`: gets a string upon (start index - end index) position
-   `SETRANGE`: sets a string upon from index value: SETRANGE model 2 bule
-   using radis we can make robust minimized datas and retrieve them faster as well

#### Numbers:

-   `SET`: set a number : `SET key 1`
-   INCR: increament a key with 1 : `INCR key`
-   `DECR`: decrement a key with 1 : `DECR key`
-   `INCRBY`: increament a number by given limit : `INCRBY key 10`
-   `DECRBY`: decrement a number by given limit : `DECRBY key 5`
-   `INCRBYFLOAT`: increament a number float wise limit : `INCRBYFLOAT key -2.55`

*   Redis is synchronous and single threaded by nature.

---

### Section 3: E-commerce App Setup

### Law of caching:

#### Redis Design Methodology:

-   Figure out what queries we need to answer
-   Structure data to best answer those queries

#### Key naming conventions:

-   Keys should be unique
-   Other engineers should understand what a key is for
-   Tip - use functions to generate your key names so you never make a typo
-   Extremely common practice is to use a ':' to separate different parts of the key
-   Small twist on common practice - we are going to use a # before unique ID's to make implementing search easier : users#45

### Section 4: Local redis Setup

#### Install docker desktop

-   run

```bash
docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest
```

-   moderate

```bash
docker exec -it redis-stack-server redis-cli
```

-   connection for local redis with rbay:

```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PW=
```

-   If you want to connect RBook to your local copy of Redis, you will need to run RBook locally.

    -   To run RBook locally, run npx rbook at your terminal.

    -   Navigate to localhost:3050

    -   Open the connection settings window

    -   Enter a host of 'localhost'

    -   Enter a port of 6379

    -   Leave the password blank

    -   When running RBook locally, any notebooks you create will be added to the folder you ran npx rbook in.

---

### Section 5: Hash Data Structures

#### Initial:

-   A hash in redis can be an object of key value pairs but they will not be deeply nested:

    -   will work:
        ```json
        {
            "name": "IQ & CO.",
            "created": 1989,
            "industry": "Technology"
        }
        ```

-   in redis hashes there can only be number and strings as value for the keys

-   `HSET`: set multiple key value pare under a mother key : `HSET company name iq industry tech age 12.3 estd 1945`
-   `HGET`: get a single key value : `HGET compnay industry`
-   `HGETALL`: gets all the key values from a mother key : `HGETALL company`
-   `HEXISTS`: checks if a key under monther key exists: `HEXISTS company age`
-   `DEL`: deleted all the key value pair under a mother key: `DEL company`
-   `HDEL`: deletes a single key value under mother key : `HDEL company age`
-   `HINCRBY`: increament a certain key's value under mother key which must be an integer : `HINCRBY company estd 10`
-   `HINCRBYFLOAT`: increament a certain key's value under mother key which must be an float : `HINCRBYFLOAT company a 10.5`
-   `HSTRLEN`: gives the length of the value under a key under mother key : `HSTRLEN company industry`
-   `HKEYS`: gives all the keys under the mother key: `HKEYS company`
-   `HVALS`: gives all the values under all the keys under the mother key : `HVALS company`
-   `HMSET`: can set a new key and value under the mother key: `HMSET company newKey "new value"` [The same can be achieved using HINCRBY]

### Section 6: Redis has gotchas!

-   please check out the file in sandbox: index.ts

### Section 7: Powerful design pattern

-   SQL Database Design Methodology

    -   Put the data in tables
    -   Figure out how we will query it

-   Redis Design Methodology

    -   Figure out what queries we need to answer
    -   Structure data to best answer those queries

-   Reasons to Store as Hash

    -   The record has many attributes
    -   A collection of these records have to be sorted many different ways
    -   Often need to access a single record at a time

-   Don't Use Hashes When...

    -   The record is only for counting or enforcing uniqueness
    -   Record stores only one or two attributes
    -   Used only for creating relations between different records
    -   The record is only used for time series data

---

### Section 8: Pipelining commands

-   Redis does not give power to fetch multiple hashes(IDs) in one single command

    -   Possible solutions [1]:
        -   Loop through the Ids and execute HGETALL and get the records one by one.
        -   We create a hash for each id and execute the HGETALL command each time of creating the id. meaning:
            -   the loop is running
            -   the loop is creating hash
            -   the loop is executing individual command
        -   !!! THIS IS NOT EFFECIENT
    -   Possible solutions [2]:
        -   We create batch of command using loop
        -   we execute HGETALL command for all the ids in one go.
            -   we create hash with ids in a loop but
            -   we tell the loop not to send the request to redis yet
            -   we complete the loop
            -   we complete creating the batch of HGETALL
            -   we give the list of request to redis
            -   redis gives us a list of records

---

### Section 9: Enforcing uniqueness with set

-   Redis has a special feature called set

    -   In set:

        -   [SADD] we can add unique value in a set

            -   If we keep adding the same value its not going to be added in the set

            *   Example:
                -   `SADD`: Add a unique value with a key: `SADD name Iqbal` -> will return 1 -> Its going to add iqbal to a set of name.
                    -   if we try to add `SADD name Iqbal` -> will return 0 -> Its not going to add any value in the key of name.

        -   [SUNION] we can keep and show the same values existing in saparate sets

            -   `SADD colors:1 red blue green`
            -   `SADD colors:2 yellow purple green`
            -   `SADD colors:3 shen green ken`

                -   `SUNION colors:1 colors:2 colors:3` -> will give us the combined values of unions from the sets:

                    -   [
                        "red",
                        "blue",
                        "green",
                        "yellow",
                        "purple",
                        "white",
                        "shen",
                        "ren",
                        "ken"
                        ]

                -   `SINTER colors:1 colors:2 colors:3` -> will give us only the common value from all the sets
                    -   [
                        "blue"
                        ]
                -   `SDIFF colors:1 colors:2 colors:3` -> will only give us the unique value that only exist in x but not in n numbers in sets.

                    -   [
                        "red"
                        ]

                -   `SINTERSTORE color:result colors:1 colors:2 colors:3` -> will store the common values in a new key
                -   `SMEMBERS color:result` -> will show the values stored in the new key
                    [
                    "blue",
                    "green"
                    ]
                -   `SISMENBER color:result blue` -> will give 1 if blue exists on color:result key and 0 if not exist
                -   `SMISMEMBER color:result blue green` -> will give us an array of true and false.
                    -   [
                        1,
                        1
                        ]
                -   `SCARD color:result` -> this gives the number of elements in a key
                -   `SSCAN colors:1 0 COUNT 2` -> this gives the paginated data. 0 is the page number in here. 2 is the number of element to show in a page.

*   -   Use cases for SETS of Redis:
        -   Enforcing uniqueness of any value : suppose a user wants to register but in our cache we have the user already registered.
        -   Creating a relationship between different records:
        -   Finding common attributes between different things: SINTER to see the common items liked by 2 users.
        -   General list of elements where order doesn't matter:

---

### Section 10: Implementing sets

---

### Section 11: Sorted SET

-   Redis has a special feature called Sorted set

    -   In sorted set all the members are sorted from low to high. 0 1 2 3 4 5....

    -   Sorted Set:

        -   `ZADD` is used to add a member-score pair to a sorted set. The command is a little unusual

            -   you first provide the score _then_ the member: `ZADD products 45 monitor`

        -   `ZSCORE` returns the score of a member: `ZSCORE products monitor`

        -   `ZREM` removes a member-value pair: `ZREM products monitor`

        *   Reference:

        ```REDIS
            DEL products

            ZADD products 45 cpu
            ZADD products 10 keyboard
            ZADD products 55 power

            ZCARD products
        ```

        -   `ZCARD` returns the total number of members in a sorted set: `ZCARD products` => 3.
        -   `ZCOUNT` is very similar to `ZCARD`, but includes from filtering criteria.

            You can use `ZCOUNT` to find the number of members between a range of two scores. By default, these scores are _inclusive_.

            There is a variation on the score syntax. Adding in an opening paren before a score (E.g. `(45`) changes the comparison to 'greater than' when applied to the lower bounds, or 'less than' when applied to the upper bound.

            You can also use `-inf` or `+inf` to specify negative or positive infinity, respectively.

            -   `ZCOUNT -inf 55` => 3

        -   `ZPOPMIN` removes and returns the member with the lowest score: `ZPOPMIN products 3` => ["keyboard","10","cpu","45","power","55"]
        -   `ZPOPMAX` removes and returns the member with the greatest score: `ZPOPMAX products 2` => ["power","55","cpu","45"]
        -   `ZINCRBY` adjusts the score of an existing member-score pair: `ZINCRBY products 15 cpu` => "60"
            -   Provide a negative number to subtract from a score: `ZINCRBY products -15 cpu` => "30"
            -   New key with value can also be added using `ZINCRBY`: `ZINCRBY products -15 x` => "-15"
        -   `ZRANGE` Filter the set and find value from 0-60 and limit the result from index 1-3: `ZRANGE products 0 60 BYSCORE LIMIT 0 3` => ["keyboard","cpu","power"]
            -   also can be applied using `WITHSCORE` `-inf` `+inf` `(45` `45)`
            -   `REV`: will reverse the current set and after that will apply other commands to the set



