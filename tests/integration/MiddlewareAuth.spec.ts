import "mocha";
import { expect } from "chai";
import request from "supertest";
import { v4 as uuidv4 } from "uuid";

import connections from "../../src/database/connections";
import server from "../../src/bin/app";
import Password from "../../src/utils/Password";
import { UserRegisterDto } from "../../src/dto/UserDTO";
import { IUser } from "../../src/types/user/User";

describe("Middleware Auth", () => {
  let authToken: string;
  const password = "123456";

  beforeAll(async () => {
    const user = {
      id: uuidv4(),
      name: "User authenticate",
      email: "authenticate@email.com",
    };

    const hashPassword = await Password.hashPassword(password);

    await connections<UserRegisterDto>("users").insert({
      id: user.id,
      name: user.name,
      email: user.email,
      password: hashPassword,
    });

    const response = await request(server).post("/api/v1/app/auth/login").send({
      email: user.email,
      password,
    });

    const data = JSON.parse(response.text);

    authToken = data["token"];
  });

  it("# should user authenticate return their datas", async () => {
    const response = await request(server)
      .get(`/api/v1/app/users/`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).to.equal(200);
  });

  it("# should user not authenticate must not return their datas", async () => {
    const response = await request(server)
      .get(`/api/v1/app/users/`)
      .set("Authorization", `Bearer tests`);

    expect(response.status).to.equal(401);
  });

  it("# should user not authenticate with invalid token", async () => {
    const response = await request(server)
      .get(`/api/v1/app/users/`)
      .set("Authorization", `Bearer`);

    expect(response.status).to.equal(401);
  });

  it("# should user that not header Authorization must not access routes that need to be authenticate", async () => {
    const response = await request(server).get(`/api/v1/app/users/`);

    expect(response.status).to.equal(401);
  });

  it("# should user not exists must not return their datas", async () => {
    const email = "authenticate@email.com";

    await connections<IUser>("users").delete().where({ email: email });

    const response = await request(server)
      .get(`/api/v1/app/users/`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).to.equal(404);
  });
});
