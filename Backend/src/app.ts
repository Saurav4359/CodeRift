import express from "express";
import { runServer } from "./server";
import cookieParser from "cookie-parser";
import {
  hiddenTestcases,
  Problems,
  Signin,
  Signup,
  submission,
  visibleTestcases,
} from "./controller/Controller";
import { logout } from "./auth/logout";
import { AuthMiddleware } from "./Middlewares/AuthMiddleware";
import { AdminCheck } from "./Middlewares/AdminCheck";
import { AddQueue } from "./modules/queue/queue";
import { prisma } from "./config/db";
// import { workers } from "./modules/worker/worker";

const app = express();
app.use(express.json());
app.use(cookieParser());
const router = express.Router();
app.use("/auth", router);
router.post("/signup", Signup);
router.post("/login", Signin);
router.post("/logout", logout);

app.use("/submit", router);
router.post("/problem", AuthMiddleware, AdminCheck("ADMIN"), Problems);
router.post(
  "/visibletestcase/:problemId",
  AuthMiddleware,
  AdminCheck("ADMIN"),
  visibleTestcases,
);
router.post(
  "/hiddentestcase/:problemId",
  AuthMiddleware,
  AdminCheck("ADMIN"),
  hiddenTestcases,
);
router.post("/submission", AuthMiddleware, submission);
runServer(app);
// AddQueue({language_id:21,code : "hello word",problem_id: "5634645"});
// workers();

console.log(
  await prisma.hidden_testcases.findMany({
    where: {
      problemId: "8a49eddf-d04a-4e54-b95a-3621214e8a82",
    },
    select: {
      inputPath: true,
      outputPath: true,
    },
  }),
);
