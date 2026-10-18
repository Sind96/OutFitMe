require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app").default;
const User = require("../models/user.model").default;
const ClothingItem = require("../models/clothingItem.model").default;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URI);
  await User.deleteMany();
});

afterEach(async () => {
  await ClothingItem.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

const registerTestUser = async (username = "test") => {
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
});

describe("Profile security", () => {
  it("rejects unauthenticated profile updates", async () => {
    const response = await request(app)
      .put("/profile/update")
      .send({ username: "updated" });

    expect(response.status).toBe(401);
  });

  it("rejects unauthenticated profile deletion", async () => {
    const response = await request(app).delete("/profile/delete");

    expect(response.status).toBe(401);
  });

  it("allows a user to update their own profile", async () => {
    const { token, user } = await registerTestUser();

    const response = await request(app)
      .put("/profile/update")
      .set("Authorization", `Bearer ${token}`)
      .send({ username: "updated" });

    expect(response.status).toBe(200);
    expect(response.body.user.username).toBe("updated");
    expect(response.body.user.password).toBeUndefined();

    const updatedUser = await User.findById(user._id);
    expect(updatedUser.username).toBe("updated");
  });

  it.each(["password", "email", "favouriteOutfits"])(
    "rejects updates to restricted field %s",
    async (field) => {
      const { token } = await registerTestUser();

      const response = await request(app)
        .put("/profile/update")
        .set("Authorization", `Bearer ${token}`)
        .send({ [field]: "unauthorised-change" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Validation failed");
    },
  );

  it("does not allow one user to update another user's profile", async () => {
    const { token } = await registerTestUser("alice");
    const { user: bob } = await registerTestUser("bob");

    const response = await request(app)
      .put(`/profile/update/${bob._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ username: "hacked" });

    expect(response.status).toBe(404);

    const unchangedBob = await User.findById(bob._id);
    expect(unchangedBob.username).toBe("bob");
  });

  it("allows a user to delete their own account", async () => {
    const { token, user } = await registerTestUser();

    const response = await request(app)
      .delete("/profile/delete")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(await User.findById(user._id)).toBeNull();
  });

  it("does not allow one user to delete another user's account", async () => {
    const { token } = await registerTestUser("alice");
    const { user: bob } = await registerTestUser("bob");

    const response = await request(app)
      .delete(`/profile/delete/${bob._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(await User.findById(bob._id)).not.toBeNull();
  });

  it("rejects duplicate usernames during profile updates", async () => {
    const { token } = await registerTestUser("alice");
    await registerTestUser("bob");

    const response = await request(app)
      .put("/profile/update")
      .set("Authorization", `Bearer ${token}`)
      .send({ username: "bob" });

    expect(response.status).toBe(409);
  });

  it("deletes only the account owner's clothing when deleting their profile", async () => {
    const { token: aliceToken, user: alice } = await registerTestUser("alice");

    const { user: bob } = await registerTestUser("bob");

    const aliceItem = await ClothingItem.create({
      userId: alice._id,
      imgURL: "https://example.com/alice.jpg",
      item: "top",
      tempRange: ["warm"],
      rain: "true",
    });

    const bobItem = await ClothingItem.create({
      userId: bob._id,
      imgURL: "https://example.com/bob.jpg",
      item: "top",
      tempRange: ["warm"],
      rain: "true",
    });

    const response = await request(app)
      .delete("/profile/delete")
      .set("Authorization", `Bearer ${aliceToken}`);

    expect(response.status).toBe(200);

    expect(await User.findById(alice._id)).toBeNull();
    expect(await ClothingItem.findById(aliceItem._id)).toBeNull();

    expect(await User.findById(bob._id)).not.toBeNull();
    expect(await ClothingItem.findById(bobItem._id)).not.toBeNull();
  });
});

it("does not allow a user to select another account through the request body", async () => {
  const { token } = await registerTestUser("alice");
  const { user: bob } = await registerTestUser("bob");

  const response = await request(app)
    .put("/profile/update")
    .set("Authorization", `Bearer ${token}`)
    .send({
      userId: bob._id.toString(),
      username: "hacked",
    });

  expect(response.status).toBe(400);

  const unchangedBob = await User.findById(bob._id);
  expect(unchangedBob.username).toBe("bob");
});

describe("Favourites security", () => {
  const outfit = {
    top: "https://example.com/top.jpg",
    bottom: "https://example.com/bottom.jpg",
    shoe: "https://example.com/shoe.jpg",
  };

  it("rejects unauthenticated requests", async () => {
    const responses = await Promise.all([
      request(app).get("/favourites"),
      request(app).post("/favourites").send(outfit),
      request(app).delete("/favourites/507f1f77bcf86cd799439011"),
    ]);

    responses.forEach((response) => {
      expect(response.status).toBe(401);
    });
  });

  it("returns only the authenticated user's favourites", async () => {
    const { token: aliceToken } = await registerTestUser("alice");
    const { token: bobToken } = await registerTestUser("bob");

    await request(app)
      .post("/favourites")
      .set("Authorization", `Bearer ${bobToken}`)
      .send(outfit)
      .expect(200);

    const response = await request(app)
      .get("/favourites")
      .set("Authorization", `Bearer ${aliceToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("allows a user to save and retrieve their own favourites", async () => {
    const { token } = await registerTestUser();

    const addResponse = await request(app)
      .post("/favourites")
      .set("Authorization", `Bearer ${token}`)
      .send(outfit);

    expect(addResponse.status).toBe(200);
    expect(addResponse.body).toHaveLength(1);

    const getResponse = await request(app)
      .get("/favourites")
      .set("Authorization", `Bearer ${token}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body[0]).toMatchObject(outfit);
  });

  it("prevents users from removing another user's favourite", async () => {
    const { token: aliceToken } = await registerTestUser("alice");
    const { token: bobToken } = await registerTestUser("bob");

    const savedResponse = await request(app)
      .post("/favourites")
      .set("Authorization", `Bearer ${bobToken}`)
      .send(outfit)
      .expect(200);

    const favouriteId = savedResponse.body[0]._id;

    const deleteResponse = await request(app)
      .delete(`/favourites/${favouriteId}`)
      .set("Authorization", `Bearer ${aliceToken}`);

    expect(deleteResponse.status).toBe(404);

    const bobResponse = await request(app)
      .get("/favourites")
      .set("Authorization", `Bearer ${bobToken}`);

    expect(bobResponse.body).toHaveLength(1);
  });

  it("allows a user to remove their own favourite", async () => {
    const { token } = await registerTestUser();

    const savedResponse = await request(app)
      .post("/favourites")
      .set("Authorization", `Bearer ${token}`)
      .send(outfit)
      .expect(200);

    const favouriteId = savedResponse.body[0]._id;

    const response = await request(app)
      .delete(`/favourites/${favouriteId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.favouriteOutfits).toEqual([]);
  });

  it("rejects invalid favourite payloads", async () => {
    const { token } = await registerTestUser();

    const response = await request(app)
      .post("/favourites")
      .set("Authorization", `Bearer ${token}`)
      .send({
        top: "https://example.com/top.jpg",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation failed");
  });

  it("rejects duplicate favourites", async () => {
    const { token } = await registerTestUser();

    await request(app)
      .post("/favourites")
      .set("Authorization", `Bearer ${token}`)
      .send(outfit)
      .expect(200);

    const response = await request(app)
      .post("/favourites")
      .set("Authorization", `Bearer ${token}`)
      .send(outfit);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("This outfit is already saved");
  });
});
