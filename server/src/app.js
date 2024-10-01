import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";


const app = express();


app.use(morgan("dev"));
app.use(express.json({ limit : "10mb" }));
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());
app.use(express.static("public"));


import userRoutes from "./routes/user.routes.js";
import memoryRoutes from "./routes/memory.routes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/memory", memoryRoutes);

export { app };

