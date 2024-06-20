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
