import { expect } from "chai";
import request from "supertest";
import faker from "faker";
import { v4 as uuidv4 } from "uuid";

import server from "../../src/bin/app";

describe("Authentication", () => {
  const user = {
    id: uuidv4(),
    name: faker.name.title(),
    email: faker.internet.email(),
    password: "123456",
  };

  beforeAll(async () => {
    await request(server).post("/api/v1/app/users/").send({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  });

  it("# should authenticate with valid credentials", async () => {
    const response = await request(server).post("/api/v1/app/auth/login").send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).to.equal(200);
  });

  it("# should not authenticate with invalid credentials", async () => {
    const response = await request(server).post("/api/v1/app/auth/login").send({
      email: user.email,
      password: "invalidpassword",
    });

    expect(response.status).to.equal(401);
  });

  it("# should not authenticate if user not exists", async () => {
    const response = await request(server).post("/api/v1/app/auth/login").send({
      email: "notregister@email.com",
      password: user.password,
    });

    expect(response.status).to.equal(404);
  });

  it("# should not authenticate if email or password is null", async () => {
    const response = await request(server).post("/api/v1/app/auth/login").send({
      email: "",
      password: "",
    });

    expect(response.status).to.equal(400);
  });
});
