import "reflect-metadata"
import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import {HelloResolver} from "./resolvers/hello";
import {PostResolver} from "./resolvers/post";
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis'
import {__prod__, COOKIE_NAME} from "./constants";
import {UserResolver} from './resolvers/user';
import cors from 'cors';
import {User} from './entities/User';
import {createConnection} from 'typeorm';

const port = 5001;

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    database: 'lireddit2',
    username: 'postgres',
    password: 'postgres',
    logging: true,
    synchronize: true,
    entities: []
  })
    const orm = await MikroORM.init(microConfig);
    await orm.em.nativeDelete(User, {})
    await orm.getMigrator().up();

    const app = express();

    const RedisStore = connectRedis(session)
    const redis = new Redis();
    app.use(
      cors({
      origin: "http://localhost:3000",
      credentials: true,
      })
    )

    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: "lax", // csrf
                secure: __prod__, //cookie only works in https

            },
            saveUninitialized: false,
            secret: 'asdihafuisohsigfdhihisdhfisd',
            resave: false,
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false
        }),
        context: ({req, res }) => ({ em: orm.em, req, res, redis }),
    });

    apolloServer.applyMiddleware({
      app,
      cors: false,
    });

    app.listen(port, () => {
        console.log(`server started on localhost: ${port}`);
    });
};

main().catch((err) => {
    console.log(err);
});

