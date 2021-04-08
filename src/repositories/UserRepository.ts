import connections from "@database/connections";
import { validate } from "class-validator";
import { v4 as uuidv4 } from "uuid";

import { UserRegisterDto } from "@dto/UserDTO";
import { ValidationError } from "@helpers/response/Error";
import { IUser } from "@typing/user/User";
import { User } from "@database/models/User";

class UserRepository {
  async save(data: UserRegisterDto, password: string) {
    const { email, name } = data;

    const user = new User();
    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;

    const errors = await validate(user);

    if (errors.length > 0) {
      console.log(errors);
      throw new ValidationError(errors);
    }

    await connections<UserRegisterDto>("users").insert(user);

    return user;
  }

  async findOneUserById(id: string) {
    const user = await connections
      .first(["id", "name", "email"])
      .from<IUser>("users")
      .where({ id: id });

    return user;
  }

  async findOneUserByEmail(email: string) {
    const user = await connections
      .first(["id", "email", "name", "password"])
      .from<IUser>("users")
      .where({ email: email });

    return user;
  }
}

export default new UserRepository();
