import "mocha";
import { expect } from "chai";
import request from "supertest";
import farker from "faker";
import { v4 as uuidv4 } from "uuid";

import connections from "../../src/database/connections";
import server from "../../src/bin/app";
import Password from "../../src/utils/Password";
import { UserRegisterDto } from "../../src/dto/UserDTO";

describe("User", () => {
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

  it("# should be register", async () => {
    const response = await request(server).post("/api/v1/app/users").send({
      name: farker.name.title(),
      email: farker.internet.email(),
      password,
    });

    expect(response.status).to.equal(201);
  });

  it("# should be not register if email exists", async () => {
    const response = await request(server).post("/api/v1/app/users").send({
      name: farker.name.title(),
      email: "authenticate@email.com",
      password,
    });

    expect(response.status).to.equal(409);
  });

  it("# should be not register with name null", async () => {
    const response = await request(server).post("/api/v1/app/users").send({
      name: "",
      email: farker.internet.email(),
      password,
    });

    expect(response.status).to.equal(400);
  });

  it("# should be not register with email null", async () => {
    const response = await request(server).post("/api/v1/app/users").send({
      name: farker.name.title(),
      email: "",
      password,
    });

    expect(response.status).to.equal(400);
  });

  it("# should be not register with password null", async () => {
    const response = await request(server).post("/api/v1/app/users").send({
      name: farker.name.title(),
      email: farker.internet.email(),
      password: "",
    });

    expect(response.status).to.equal(400);
  });

  it("# should be not register with invalid email", async () => {
    const response = await request(server).post("/api/v1/app/users").send({
      name: farker.name.title(),
      email: "invalid@email",
      password,
    });

    expect(response.status).to.equal(400);
  });
});
