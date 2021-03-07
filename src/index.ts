import "reflect-metadata"
import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import {HelloResolver} from "./resolvers/hello";
import {PostResolver} from "./resolvers/post";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis'
import {__prod__} from "./constants";
import {MyContext} from "./types";

const port = 5000;

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    const app = express();

    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient()

    app.use(
        session({
            name: 'qid',
            store: new RedisStore({
                client: redisClient,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: "lax", // csrf
                secure: __prod__, //cookie only works in https

            },
            secret: 'asdihafuisohsigfdhihisdhfisd',
            resave: false,
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false
        }),
        context: ({req, res }): MyContext => ({ em: orm.em, req, res }),
    });

    apolloServer.applyMiddleware({ app });

    app.listen(port, () => {
        console.log(`server started on localhost: ${port}`);
    });
};

main().catch((err) => {
    console.log(err);
});

