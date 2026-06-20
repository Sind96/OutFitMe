require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const User = require("../models/user.model");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URI);
  await User.deleteMany();
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth routes", () => {
  it("POST /register creates a user", async () => {
    const payload = {
      username: "test",
      email: "test@email.com",
      password: "password123",
    };

    const response = await request(app).post("/register").send(payload);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created successfully");
    expect(response.body.accessToken).toBeDefined();
  });

  it("POST /register rejects duplicate username or email", async () => {
    const payload = {
      username: "test",
      email: "test@email.com",
      password: "password123",
    };

    const firstResponse = await request(app).post("/register").send(payload);
    const response = await request(app).post("/register").send(payload);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Username or email already exists");
  });

  it("POST /register rejects missing fields", async () => {
    const response = await request(app).post("/register").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation failed");
  });

  it("POST /login logs in a registered user", async () => {
    await request(app).post("/register").send({
      username: "test",
      email: "test@email.com",
      password: "password123",
    });

    const response = await request(app).post("/login").send({
      username: "test",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.accessToken).toBeDefined();
  });

  it("POST /login rejects missing fields", async () => {
    const response = await request(app).post("/login").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation failed");
  });

  it("POST /login rejects invalid credentials", async () => {
    const response = await request(app).post("/login").send({
      username: "notreal",
      password: "password123",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });

  it("GET /logout returns logout success", async () => {
    const response = await request(app).get("/logout");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Logout successful");
  });
});
