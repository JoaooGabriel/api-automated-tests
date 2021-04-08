import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import config from "@config/config";
import { UnauthorizedError } from "@helpers/response/Error";

const secretToken = config.secretToken;

export function AuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const header = request.headers["authorization"];

  if (!header) {
    throw new UnauthorizedError("Você precisar estar autenticado");
  }

  const parts = header.split(" ");

  if (parts.length !== 2) {
    throw new UnauthorizedError("Invalid Token");
  }

  const [, token] = parts;

  if (!secretToken) return;

  jwt.verify(token, secretToken, (err, decode) => {
    if (err) {
      throw new UnauthorizedError("Invalid Token");
    }

    response.locals["user"] = decode;
    next();
  });
}
