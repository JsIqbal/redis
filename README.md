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

-   create a redis in redis
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
-   GET: get a value using key: GET message
-   NX: create if the key doesn't exist yet : SET color blue NX / SETNX color blue
-   EX: remove the record after limit time : SETEX message 2 "Hello World!"
-   MGET: multiple get values for keys : MSETNX colofgsdr blue moshfdel toyota
-   MSET: multiple set values for keys : MGET colofgsdr moshfdel
-   DEL: deletes the key: DEL message
-   GETRANGE: gets a string upon (start index - end index) position
-   SETRANGE: sets a string upon from index value: SETRANGE model 2 bule
-   using radis we can make robust minimized datas and retrieve them faster as well

#### Numbers:

-   SET: set a number : SET key 1
-   INCR: increament a key with 1 : INCR key
-   DECR: decrement a key with 1 : DECR key
-   INCRBY: increament a number by given limit : INCRBY key 10
-   DECRBY: decrement a number by given limit : DECRBY key 5
-   INCRBYFLOAT: increament a number float wise limit : INCRBYFLOAT key -2.55

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

-   HSET: set multiple key value pare under a mother key : HSET company name iq industry tech age 12.3 estd 1945
-   HGET: get a single key value : HGET compnay industry
-   HGETALL: gets all the key values from a mother key : HGETALL company
-   HEXISTS: checks if a key under monther key exists: HEXISTS company age
-   DEL: deleted all the key value pair under a mother key: DEL company
-   HDEL: deletes a single key value under mother key : HDEL company age
-   HINCRBY: increament a certain key's value under mother key which must be an integer : HINCRBY company estd 10
-   HINCRBYFLOAT: increament a certain key's value under mother key which must be an float : HINCRBYFLOAT company a 10.5
-   HSTRLEN: gives the length of the value under a key under mother key : HSTRLEN company industry
-   HKEYS: gives all the keys under the mother key: HKEYS company
-   HVALS: gives all the values under all the keys under the mother key : HVALS company
-   HMSET: can set a new key and value under the mother key: HMSET company newKey "new value" [The same cane be achieved using HINCRBY]

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
