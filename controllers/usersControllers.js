import gravatar from "gravatar";
import fs from "fs/promises";
import path from "path";
import {
    registerUser,
    loginUser,
    logoutUser,
    uploadAvatarService,
} from "../services/usersServices.js";

const avatarsDir = path.resolve("public/avatars");

export async function register(req, res) {
    const { email, password } = req.body;

    const avatarURL = gravatar.url(email, { s: "200", d: "retro", r: "pg", protocol: "https" });
    console.log("avatarUrl", avatarURL);

    const result = await registerUser(email, password, avatarURL);

    if (result.error) {
        return res
            .status(result.error.status)
            .json({ message: result.error.message });
    }

    res.status(201).json(result);
}

export async function login(req, res) {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    if (result.error) {
        return res
            .status(result.error.status)
            .json({ message: result.error.message });
    }

    res.status(200).json(result);
}

export async function logout(req, res) {
    const user = req.user;
    const result = await logoutUser(user);

    if (result.error) {
        return res
            .status(result.error.status)
            .json({ message: result.error.message });
    }

    return res.status(result.status).send();
}

export async function current(req, res) {
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "Not authorized" });
    }

    return res.status(200).json({
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
    });
}

export const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file to upload" });
        }
        const { path: tempPath, originalname } = req.file;
        const ext = path.extname(originalname);
        const newFilename = `${req.user.id}${ext}`;
        const newFilePath = path.join(avatarsDir, newFilename);

        await fs.rename(tempPath, newFilePath);

        const avatarURL = `/avatars/${newFilename}`;

        await uploadAvatarService(req, avatarURL);

        res.status(200).json({ avatarURL });
    } catch (error) {
        console.error("Error during avatar upload:", error);
        res.status(500).json({ error: "Failed to upload avatar" });
    }
};