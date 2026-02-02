import type { Request,Response } from "express";

export const helo = (req: Request, res: Response) => {
    res.send("hello, worlfbfd");
};
