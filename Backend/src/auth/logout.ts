import type { Request, Response } from "express";
import crypto from "crypto";
import { prisma } from "../config/db";
 export const logout= async (req : Request, res :Response)=> {
    const refresh = req.cookies.refresh;

    if(refresh) {
         const token = crypto.createHash("sha256").update(refresh).digest("hex");
         await prisma.refreshToken.deleteMany({ where: {token }});
    }
        
    res.clearCookie("refresh");
    res.json({ success: true });
 }