import jwt from "jsonwebtoken";

import config from "@config/config";

const secretToken = config.secretToken;
const timeExpiredToken = config.timeExpiredToken;

class Token {
  async createToken(id: string) {
    if (!secretToken) return;

    const token = jwt.sign({ id: id }, secretToken, {
      expiresIn: timeExpiredToken,
    });

    return token;
  }
}

export default new Token();
