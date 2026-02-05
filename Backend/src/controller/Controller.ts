import type { Request, Response } from "express";
import {
  problems,
  signin,
  signup,
  submissiontype,
  testcases,
} from "../types/types";
import crypto from "crypto";
import { prisma } from "../config/db";
import {
  ComparePassword,
  GenerateToken,
  HashPassword,
} from "../utils/services";
import type { AdminReq } from "../Middlewares/AuthMiddleware";
import { UploadTest } from "../modules/Supabase/uploadFile";
import { submitCode } from "../modules/judge/execution";
import { AddQueue } from "../modules/queue/queue";

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

    await prisma.refreshToken.deleteMany({ where: { userId: user.id } });
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
  if (!success) {
    return res.status(400).json({
      success: false,
      error: "Invalid Input",
    });
  }

  try {
    await prisma.problem.create({
      data: {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        tags: data.tags,
        timeLimit: data.timeLimit,
        memoryLimit: data.memoryLimit,
        userId: (req as AdminReq).id,
      },
    });

    res.status(201).json({ success: true, message: "Problem uploaded" });
  } catch (e) {
    res.status(500).json({ error: "Internal Error " });
  }
  // res.cookie;
};

export const visibleTestcases = async (req: Request, res: Response) => {
  const problemId = <string>req.params.problemId; // or as string
  const { success, data, error } = testcases.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      success: false,
      error: "Invalid Input",
    });
  }
  try {
    const prob = await prisma.problem.findFirst({
      where: { id: problemId, userId: (req as AdminReq).id },
    });
    if (!prob) {
      return res.status(404).json({ message: "You dont have problem created" });
    }
    const test = await prisma.visible_testcases.findMany({
      where: { problemId: problemId },
    });
    const len = test.length;
    const inputfilepath = `VisibleTestCase/INPUT/${problemId}file${len + 1}`;
    const outputfilepath = `VisibleTestCase/OUTPUT/${problemId}file${len + 1}`;
    await UploadTest(inputfilepath, data.input);
    await UploadTest(outputfilepath, data.output);
    await prisma.visible_testcases.create({
      data: {
        inputPath: inputfilepath,
        outputPath: outputfilepath,
        problemId,
      },
    });
    res.send("done");
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const hiddenTestcases = async (req: Request, res: Response) => {
  const problemId = <string>req.params.problemId; // or as string
  const { success, data, error } = testcases.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      success: false,
      error: "Invalid Input",
    });
  }
  try {
    const prob = await prisma.problem.findFirst({
      where: { id: problemId, userId: (req as AdminReq).id },
    });
    if (!prob) {
      return res.status(404).json({ message: "You dont have problem created" });
    }
    const test = await prisma.hidden_testcases.findMany({
      where: { problemId: problemId },
    });
    const len = test.length;
    const inputfilepath = `HiddenTestCase/INPUT/${problemId}file${len + 1}`;
    const outputfilepath = `HiddenTestCase/OUTPUT/${problemId}file${len + 1}`;
    await UploadTest(inputfilepath, data.input);
    await UploadTest(outputfilepath, data.output);
    await prisma.hidden_testcases.create({
      data: {
        inputPath: inputfilepath,
        outputPath: outputfilepath,
        problemId,
      },
    });
    res.send("done");
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const submission = async (req: Request, res: Response) => {
  const problemId = <string>req.params.problemId; // or as string
  const { success, data, error } = submissiontype.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      success: false,
      error: "Invalid Input",
    });
  }
  try {
    await AddQueue({
      userId: (req as AdminReq).id,
      language_id: data.language_id,
      stdin: "",
      source_code: data.code,
      problemId: problemId,
    });
    res.json({
      message : "Code Submitted"
    })
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const submission_result = async (req: Request, res: Response) => {};


