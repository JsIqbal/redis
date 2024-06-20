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

### Section #: E-commerce App Setup

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
