import express from "express";
import multer from "multer";
import path from "path";
import { register, login, logout, current, uploadAvatar } from "../controllers/usersControllers.js";
import { validateBody } from "../helpers/validateBody.js";
import { registerSchema } from "../schemas/usersSchemas.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const uploadDir = path.resolve("temp");
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${req.user.id}${ext}`);
    },
});
const upload = multer({ storage });

const userRouter = express.Router();

userRouter.post("/register", validateBody(registerSchema), register);
userRouter.post("/login", validateBody(registerSchema), login);
userRouter.post("/logout", authMiddleware, logout);
userRouter.get("/current", authMiddleware, current);
userRouter.patch("/avatars", authMiddleware, upload.single("avatar"), uploadAvatar);

export default userRouter;