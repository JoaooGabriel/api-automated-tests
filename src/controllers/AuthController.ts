import { Request, Response } from "express";

import AuthService from "@services/AuthService";
import { ServiceError } from "@helpers/response/Error";
import { StatusCode } from "@helpers/status/StatusCode";

class AuthController {
  async login(request: Request, response: Response): Promise<Response> {
    if (!request.body.email || !request.body.password) {
      return response
        .status(StatusCode.BAD_REQUEST)
        .json({ error: "Email or password invalid" });
    }

    try {
      const token = await AuthService.login(request.body);

      return response.status(StatusCode.SUCCESS).json({ token });
    } catch (err) {
      console.log(err);
      if (err instanceof ServiceError) {
        return response.status(err.statusCode).json({
          error: err.message,
        });
      }
    }

    return response
      .status(StatusCode.INTERNAL_ERROR)
      .json({ error: "Erro no servidor" });
  }
}

export default new AuthController();
