import type { Request, Response } from "express";
import { problems, signin, signup } from "../types/types";
import crypto from "crypto";
import { prisma } from "../config/db";
import {
  ComparePassword,
  GenerateToken,
  HashPassword,
} from "../utils/services";

export const Signup = async (req: Request, res: Response) => {
  const { success, data, error } = signup.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      success: false,
      error: "Invalid Input",
    });
  }
  try {
    const checkEmail = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (checkEmail) {
      return res.status(409).json({
        success: false,
        error: "Email Already Exists !",
      });
    }
    const password = await HashPassword(data.password);
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: password,
        role: data.role,
      },
    });

    res.status(201).json({
      success: true,
      message: "User Successfully created",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const Signin = async (req: Request, res: Response) => {
  const { success, data, error } = signin.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      success: false,
      error: "Invalid Input",
    });
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Incorrect email",
      });
    }
    const checkpassword = await ComparePassword(data.password, user.password);
    if (!checkpassword) {
      return res.status(401).json({
        success: false,
        error: "Incorrect Password",
      });
    }
    const accessToken = await GenerateToken({
      userId: user.id,
      role: user.role,
    });
    const refresh = crypto.randomBytes(32).toString("hex");
    const refreshToken = crypto
      .createHash("sha256")
      .update(refresh)
      .digest("hex");

      await prisma.refreshToken.deleteMany({ where : {userId :user.id}});
    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        role: user.role,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      },
    });
    res.cookie("refresh", refresh, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 3600 * 1000,
    });
    res.status(201).json({
      success: true,
      token: accessToken,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const Problems = async (req: Request, res: Response) => {
  const { success, data, error } = problems.safeParse(req.body);
  res.cookie;
};
