import usersRepository from "../repositories/usersRepository.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function registerUser(email, password, avatarURL) {
    try {
        const existingUser = await usersRepository.getByEmail(email);

        if (existingUser) {
            return { error: { status: 409, message: "Email in use" } };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await usersRepository.create(email, hashedPassword, avatarURL);

        return {
            user: {
                email: newUser.email,
                subscription: newUser.subscription,
                avatarURL: newUser.avatarURL,
            },
        };
    } catch (error) {
        console.error(error);
        return { error: { status: 500, message: "Internal Server Error" } };
    }
}

export async function loginUser(email, password) {
    try {
        const user = await usersRepository.getByEmail(email)

        if (!user) {
            return { error: { status: 401, message: "Email or password is wrong" } };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { error: { status: 401, message: "Email or password is wrong" } };
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        await user.update({ token });

        return {
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
            },
        };
    } catch (error) {
        console.error(error);
        return { error: { status: 500, message: "Internal Server Error" } };
    }
}

export async function logoutUser(user) {
    try {
        if (!user) {
            return { error: { status: 401, message: "Not authorized" } };
        }

        await user.update({ token: null });

        return { status: 204 };
    } catch (error) {
        console.error("Logout Error:", error);
        return { error: { status: 500, message: "Internal Server Error" } };
    }
}

export async function uploadAvatarService(req, avatarURL) {
    if (!req.file) {
        throw new Error("No file to upload");
    }

    try {
        return await usersRepository.updateAvatar(req.user.id, avatarURL);
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
}