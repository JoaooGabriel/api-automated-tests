import argon2 from "argon2";

class Password {
  async hashPassword(password: string) {
    const hashPassword = await argon2.hash(password, {
      type: argon2.argon2i,
      parallelism: 3,
    });

    return hashPassword;
  }

  async verifyPassword(hash: string, password: string) {
    try {
      const response = await argon2.verify(hash, password, {
        type: argon2.argon2i,
        parallelism: 3,
      });

      return response;
    } catch (err) {
      return false;
    }
  }
}

export default new Password();
