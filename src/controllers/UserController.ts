import { Request, Response } from "express";

import { StatusCode } from "@helpers/status/StatusCode";
import { ServiceError, ValidationError } from "@helpers/response/Error";
import UserService from "@services/UserService";

class UserController {
  async store(request: Request, response: Response): Promise<Response> {
    try {
      const user = await UserService.register(request.body);

      return response.status(StatusCode.CREATED).json(user);
    } catch (err) {
      console.log(err);
      if (err instanceof ValidationError) {
        return response.status(err.statusCode).json({
          errors: err.errors,
        });
      }

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

  async show(request: Request, response: Response): Promise<Response> {
    try {
      const user = await UserService.getUserById(response.locals["user"].id);

      return response.status(StatusCode.SUCCESS).json(user);
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

export default new UserController();
