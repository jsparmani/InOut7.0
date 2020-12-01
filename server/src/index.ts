import {verify} from "jsonwebtoken";
import {UserResolver} from "./resolvers/user";
import "reflect-metadata";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {createConnection} from "typeorm";
import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import {User} from "./entity/User";
import {createRefreshToken, createAccessToken} from "./utils/auth";
import {sendRefreshToken} from "./utils/sendRefreshToken";
import { ProfileResolver } from "./resolvers/profile";
import { AddressResolver } from "./resolvers/address";

(async () => {
    const app = express();
    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        })
    );

    app.use(cookieParser());
    app.get("/", (_req, res) => res.send("hello"));
    app.post("/refresh_token", async (req, res) => {
        const token = req.cookies.jid;
        if (!token) {
            return res.send({ok: false, accessToken: ""});
        }
        let payload: any = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } catch (err) {
            console.log(err);
            return res.send({ok: false, accessToken: ""});
        }

        const user = await User.findOne({id: payload.userId});

        if (!user) {
            return res.send({ok: false, accessToken: ""});
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ok: false, accessToken: ""});
        }

        sendRefreshToken(res, createRefreshToken(user));

        return res.send({ok: true, accessToken: createAccessToken(user)});
    });

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, ProfileResolver, AddressResolver],
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
