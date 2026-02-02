import express from "express";
import { runServer } from "./server";
import cookieParser from "cookie-parser";
import { Signin, Signup } from "./controller/Controller";
import crypto from "crypto";
import { logout } from "./auth/logout";
const app = express();
app.use(express.json());
app.use(cookieParser());
const router = express.Router();
app.use("/auth", router);
router.post("/signup", Signup);
router.post("/login", Signin);
router.post("/logout",logout);

runServer(app);

// console.log(crypto.createHash("sha256").update("hello").digest("hex"));
