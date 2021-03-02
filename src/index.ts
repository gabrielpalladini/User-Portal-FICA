import "reflect-metadata"
import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import {HelloResolver} from "./resolvers/hello";
import {PostResolver} from "./resolvers/post";

const port = 5000;

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    //const post = orm.em.create(Post, {title: 'my first title'});
    //wait orm.em.persistAndFlush(post);
    //const posts = await orm.em.find(Post, {});
    //      console.log(posts);

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false
        }),
        context: () => ({ em: orm.em })
    });

    apolloServer.applyMiddleware({ app });

    app.listen(port, () => {
        console.log(`server started on localhost: ${port}`);
    });
};

main().catch((err) => {
    console.log(err);
});

