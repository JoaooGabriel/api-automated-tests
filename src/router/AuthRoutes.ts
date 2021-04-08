import { Router } from "express";

import AuthConroller from "@controllers/AuthController";

const router = Router();

router.post("/login", AuthConroller.login);

export default router;
