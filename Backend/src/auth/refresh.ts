import type { Request, Response } from "express";
import crypto from "crypto";
import { prisma } from "../config/db";
import { GenerateToken } from "../utils/services";

export const refreshToken= async (req :Request,res :Response)=> {
    const oldrefresh=req.cookies.refresh;
    if(!oldrefresh){
        return res.status(400).json({ 
            error : "No refresh token"
        })
    }
    
     const oldhash= crypto.createHash("sha256").update(oldrefresh).digest("hex");

     const token =await prisma.refreshToken.findFirst({ where : { token: oldhash}});
     if(!token || token.expiresAt< new Date()) {
             return res.json({error: "Invalid refresh token"})
     }
      const accessToken = await GenerateToken({
           userId: token.id,
           role: token.role
         });
 
     const newRefres=crypto.randomBytes(32).toString("hex");
     const newHash =crypto.createHash("sha256").update(newRefres).digest("hex");

     await prisma.refreshToken.update({
        where: {
            id : token.id
        },
        data: {
            token :newHash,
            expiresAt: new Date(Date.now()+ 7 * 24 * 3600 * 1000)
        }
     })

     res.cookie("refresh", newRefres, {
        httpOnly: true,
        sameSite : "none",
        secure : true,
        maxAge: 7*24 *3600*1000
     })

     res.json({accessToken});

}