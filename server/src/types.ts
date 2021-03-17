import {Connection, EntityManager, IDatabaseDriver} from "@mikro-orm/core";
import { Request, Response } from "express";
import {Session, SessionData} from "express-session";
import { Redis} from "ioredis";

export type MyContext = {
    req: Request & { session: Session & Partial<SessionData> & { userId: number }};
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
    res: Response;
    redis: Redis;
};