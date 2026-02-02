import express from "express";
import { runServer } from "./server";
import cookieParser from "cookie-parser";
import { hiddenTestcases, Problems, Signin, Signup, visibleTestcases } from "./controller/Controller";
import { logout } from "./auth/logout";
import { AuthMiddleware } from "./Middlewares/AuthMiddleware";
import { AdminCheck } from "./Middlewares/AdminCheck";
 

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
router.post("/visibletestcase/:problemId",AuthMiddleware,AdminCheck("ADMIN"),visibleTestcases);
router.post("/hiddentestcase/:problemId",AuthMiddleware,AdminCheck("ADMIN"),hiddenTestcases);
runServer(app);


 