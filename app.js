import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import * as dotenv from 'dotenv';
dotenv.config();

import contactsRouter from "./routes/contactsRouter.js";
import usersRouter from "./routes/usersRouter.js";
import dbInstance from "./db/db.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

await dbInstance.connect();

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
