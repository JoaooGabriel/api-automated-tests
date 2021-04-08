import { Router } from "express";

import AppController from "@controllers/UserController";
import { AuthMiddleware } from '@middlewares/Auth';

const router = Router();

router.post("/", AppController.store);
router.get("/", AuthMiddleware, AppController.show);

export default router;
