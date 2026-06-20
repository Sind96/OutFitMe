const request = require("supertest");
const app = require("../app");

describe("App routes", () => {
  it("GET / returns API status message", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("OutFitMe API is running");
  });

  it("GET /api/health returns 200", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
  });

  it("GET unknown route returns 404", async () => {
    const response = await request(app).get("/unknown-route");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Route not found");
  });
});
