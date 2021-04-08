import "reflect-metadata";
import express from "express";

import UserRoutes from "@router/UserRoutes";
import AuthRoutes from "@router/AuthRoutes";

const app = express();

app.use(express.json());
app.use("/api/v1/app/users", UserRoutes);
app.use("/api/v1/app/auth", AuthRoutes);

export default app;
