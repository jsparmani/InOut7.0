import {Request, Response} from "express";

export type MyContext = {
    req: Request;
    res: Response;
    payload?: {userId: string; tokenVersion: number};
};
