import UserRepository from "@repositories/UserRepository";
import { IUser } from "@typing/user/User";
import Password from "@utils/Password";
import { NotFoundError, UnauthorizedError } from "@helpers/response/Error";
import Token from "@utils/Token";

class AuthService {
  async login(body: IUser) {
    const { email, password } = body;

    const user = await UserRepository.findOneUserByEmail(email);

    if (!user) {
      throw new NotFoundError("Email or password not exists");
    }

    const verifyPassword = await Password.verifyPassword(
      user.password,
      password
    );

    if (!verifyPassword) {
      throw new UnauthorizedError("Email or password doesn`t coincide");
    }

    const token = Token.createToken(user.id);

    return token;
  }
}

export default new AuthService();
