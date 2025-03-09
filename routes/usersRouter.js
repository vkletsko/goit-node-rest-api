import express from "express";
import { register, login, logout, current } from "../controllers/usersControllers.js";
import { validateBody } from "../helpers/validateBody.js";
import { registerSchema } from "../schemas/usersSchemas.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", validateBody(registerSchema), register);
userRouter.post("/login", validateBody(registerSchema), login);
userRouter.post("/logout", authMiddleware, logout);
userRouter.get("/current", authMiddleware, current);

export default userRouter;