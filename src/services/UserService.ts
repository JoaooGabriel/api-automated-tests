import UserRepository from "@repositories/UserRepository";
import { UserRegisterDto } from "@dto/UserDTO";
import { BadRequestError, ConflictError, NotFoundError } from "@helpers/response/Error";
import Password from "@utils//Password";

class UserService {
  async register(data: UserRegisterDto) {
    const { email, password } = data;

    if (!password) {
      throw new BadRequestError("Password cannot be empty");
    }

    const exists = await UserRepository.findOneUserByEmail(email);

    if (exists) {
      throw new ConflictError("User already exists.");
    }

    const hashPassword = await Password.hashPassword(password);

    const user = await UserRepository.save(data, hashPassword);

    return user;
  }

  async getUserById(id: string) {

    const user = await UserRepository.findOneUserById(id);

    if (!user) {
      throw new NotFoundError("User not exists.");
    }

    return user;
  }
}

export default new UserService();
