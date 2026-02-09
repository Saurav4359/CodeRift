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
import { AddQueue } from "../modules/queue/queue";
import { DownloadFile } from "../modules/Supabase/downloadFile";

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
   const result = await prisma.problem.create({
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

    res.status(201).json({ success: true, message: "Problem uploaded" , problemId : result.id});
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

const lang: Record<string, string> = {
  "91": "java",
  "102": "javascript",
  "110": "C",
  "105": "CPP",
};

export const submission = async (req: Request, res: Response) => {
  console.log("1");
  const problemId = <string>req.params.problemId; // or as string
  const { success, data, error } = submissiontype.safeParse(req.body);
  if (!success) {
    console.log("2");
    res.status(400).json({
      success: false,
      error: "Invalid Input",
    });
    console.log(error.message);
    return;
  }
  try {
    await AddQueue({
      userId: (req as AdminReq).id,
      language_id: data.language_id,
      stdin: "",
      source_code: data.code,
      problemId: problemId,
    });

    const sub = await prisma.submission.create({
      data: {
        language: lang[data.language_id] as string,
        memory: data.memory,
        runtime: data.runtime,
        sourceCode: data.code,
        problemId: problemId,
        userId: (req as AdminReq).id,
      },
    });
    console.log("code submit");
    res.json({
      submissionId: sub.id,
      message: "Code Submitted",
    });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" + e });
  }
};

export const submission_result = async (req: Request, res: Response) => {};

export const getProblemDetails = async (req: Request, res: Response) => {
  try {
    const data = await prisma.problem.findMany({
      select: {
        title: true,
        tags: true,
        difficulty: true,
        id: true,
      },
    });
    if (!data) {
      res.status(404).json({
        status: false,
        error: "Problems Not found",
      });
    }
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProblemDescription = async (req: Request, res: Response) => {
  const problemId = req.params.problemId;
  try {
    const data = await prisma.problem.findFirst({
      where: {
        id: problemId as string,
      },
      include: {
        visible_testcases: true,
      },
    });
    if (!data) {
      return res.status(400).json({
        success: false,
        error: "Problem Not found",
      });
    }
    const testcased = await Promise.all(
      data?.visible_testcases.map(async (test) => ({
        input: await DownloadFile(test.inputPath),
        output: await DownloadFile(test.outputPath),
      })),
    ); // this map function has async callback , so it gives us array of promise thats why we are awaiting and using promise.all to finish all of them  and give final result

    res.status(200).send({
      title: data?.title,
      description: data?.description,
      difficulty: data?.difficulty,
      tags: data?.tags,
      timeLimit: data?.timeLimit,
      memoryLimit: data?.memoryLimit,
      test: testcased,
    });
  } catch (e) {
    res.status(500).json({
      error: "Internal Server Error ",
    });
  }
};

export const getMySubmission = async (req: Request, res: Response) => {
  const userId = (req as AdminReq).id;
  console.log("HIi");
  try {
    const data = await prisma.submission.findMany({
      where: {
        userId: userId,
        
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        problem: {
          select: {
            title: true,
          },
        },
      },
      omit: {
         
        sourceCode : true,
        userId :true,
        problemId :true,
        id :true,

      }
    });
    console.log(2);
    console.log(data);
    res.send(data);
  } catch (e) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
