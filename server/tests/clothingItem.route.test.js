require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const User = require("../models/user.model");
const ClothingItem = require("../models/clothingItem.model");

const clothingPayload = {
  imgURL: "https://example.com/top.jpg",
  item: "Top",
  tempRange: ["warm"],
  rain: "true",
};

const registerTestUser = async (username) => {
  const response = await request(app)
    .post("/register")
    .send({
      username,
      email: `${username}@example.com`,
      password: "password123",
    });

  expect(response.status).toBe(201);

  return {
    token: response.body.accessToken,
    user: await User.findOne({ username }),
  };
};

const createItem = (token, payload = clothingPayload) => {
  return request(app)
    .post("/api/clothing-items")
    .set("Authorization", `Bearer ${token}`)
    .send(payload);
};

beforeAll(async () => {
  const mongoUri = process.env.MONGO_TEST_URI;

  if (!mongoUri) {
    throw new Error("MONGO_TEST_URI must be configured");
  }

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  await ClothingItem.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await ClothingItem.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe("Clothing item security", () => {
  it("rejects unauthenticated requests", async () => {
    const itemId = new mongoose.Types.ObjectId();

    const responses = await Promise.all([
      request(app).post("/api/clothing-items").send(clothingPayload),
      request(app).get("/api/clothing-items/top"),
      request(app).get("/api/clothing-items/random/top/warm/true"),
      request(app).delete(`/api/clothing-items/${itemId}`),
    ]);

    responses.forEach((response) => {
      expect(response.status).toBe(401);
    });
  });

  it("allows an authenticated user to upload clothing", async () => {
    const { token, user } = await registerTestUser("alice");

    const response = await createItem(token);

    expect(response.status).toBe(201);
    expect(response.body.clothingItem).toMatchObject({
      imgURL: clothingPayload.imgURL,
      item: "top",
      tempRange: ["warm"],
      rain: "true",
      userId: user._id.toString(),
    });

    expect(await ClothingItem.countDocuments()).toBe(1);
  });

  it("rejects attempts to assign clothing to another user", async () => {
    const { token: aliceToken } = await registerTestUser("alice");
    const { user: bob } = await registerTestUser("bob");

    const response = await createItem(aliceToken, {
      ...clothingPayload,
      userId: bob._id.toString(),
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation failed");
    expect(await ClothingItem.countDocuments()).toBe(0);
  });

  it("returns only the authenticated user's clothing", async () => {
    const { token: aliceToken } = await registerTestUser("alice");
    const { token: bobToken } = await registerTestUser("bob");

    await createItem(aliceToken, {
      ...clothingPayload,
      imgURL: "https://example.com/alice.jpg",
    }).expect(201);

    await createItem(bobToken, {
      ...clothingPayload,
      imgURL: "https://example.com/bob.jpg",
    }).expect(201);

    const response = await request(app)
      .get("/api/clothing-items/top")
      .set("Authorization", `Bearer ${aliceToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].imgURL).toBe("https://example.com/alice.jpg");
  });

  it("prevents users from deleting another user's clothing", async () => {
    const { token: aliceToken } = await registerTestUser("alice");
    const { token: bobToken } = await registerTestUser("bob");

    const created = await createItem(bobToken);
    expect(created.status).toBe(201);

    const itemId = created.body.clothingItem._id;

    const response = await request(app)
      .delete(`/api/clothing-items/${itemId}`)
      .set("Authorization", `Bearer ${aliceToken}`);

    expect(response.status).toBe(404);
    expect(await ClothingItem.findById(itemId)).not.toBeNull();
  });

  it("allows users to delete their own clothing", async () => {
    const { token } = await registerTestUser("alice");

    const created = await createItem(token);
    expect(created.status).toBe(201);

    const itemId = created.body.clothingItem._id;

    const response = await request(app)
      .delete(`/api/clothing-items/${itemId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(await ClothingItem.findById(itemId)).toBeNull();
  });

  it("does not return another user's clothing during random selection", async () => {
    const { token: aliceToken } = await registerTestUser("alice");
    const { token: bobToken } = await registerTestUser("bob");

    await createItem(aliceToken, {
      ...clothingPayload,
      imgURL: "https://example.com/alice.jpg",
    }).expect(201);

    await createItem(bobToken, {
      ...clothingPayload,
      imgURL: "https://example.com/bob.jpg",
    }).expect(201);

    const response = await request(app)
      .get("/api/clothing-items/random/top/warm/true")
      .set("Authorization", `Bearer ${aliceToken}`);

    expect(response.status).toBe(200);
    expect(response.body.imgURL).toBe("https://example.com/alice.jpg");
  });

  it("rejects invalid clothing payloads", async () => {
    const { token } = await registerTestUser("alice");

    const response = await createItem(token, {
      imgURL: "not-a-valid-url",
      item: "",
      tempRange: [],
      rain: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation failed");
    expect(await ClothingItem.countDocuments()).toBe(0);
  });
});

it("returns an empty array when the user has no clothing in a category", async () => {
  const { token } = await registerTestUser("alice");

  const response = await request(app)
    .get("/api/clothing-items/top")
    .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(200);
  expect(response.body).toEqual([]);
});
