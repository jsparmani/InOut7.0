import {UserResolver} from "./resolvers/user";
import "reflect-metadata";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {createConnection} from "typeorm";
import express from "express";
import "dotenv/config";

(async () => {
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
            validate: false,
        }),
        context: ({req, res}) => ({req, res}),
    });

    const conn = await createConnection();

    await conn.runMigrations();

    apolloServer.applyMiddleware({app});

    const port: any = process.env.PORT;
    app.listen(port, () => {
        console.log(`Express server started on ${port}`);
    });
})();
