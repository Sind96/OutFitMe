const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/auth.middleware");

const SECRET = "test-only-jwt-secret-not-for-production";

const invoke = (authorization) => {
  const req = { get: jest.fn(() => authorization) };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  const next = jest.fn();
  verifyToken(req, res, next);
  return { req, res, next };
};

describe("verifyToken", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = SECRET;
  });
  afterEach(() => {
    delete process.env.JWT_SECRET;
  });

  test("rejects missing Authorization header", () => {
    const { res, next } = invoke(undefined);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test("rejects token without Bearer prefix", () => {
    const token = jwt.sign({ userId: "user-1" }, SECRET);
    expect(invoke(token).res.status).toHaveBeenCalledWith(401);
  });

  test("rejects malformed Bearer header", () => {
    expect(invoke("Bearer").res.status).toHaveBeenCalledWith(401);
  });

  test("rejects invalid signature", () => {
    const token = jwt.sign({ userId: "user-1" }, "wrong-secret");
    expect(invoke(`Bearer ${token}`).res.status).toHaveBeenCalledWith(401);
  });

  test("rejects expired token", () => {
    const token = jwt.sign({ userId: "user-1" }, SECRET, { expiresIn: -1 });
    const { res } = invoke(`Bearer ${token}`);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token expired" });
  });

  test("accepts valid token and attaches user", () => {
    const token = jwt.sign({ userId: "user-1" }, SECRET, { expiresIn: "7d" });
    const { req, res, next } = invoke(`Bearer ${token}`);
    expect(next).toHaveBeenCalledWith();
    expect(req.user.userId).toBe("user-1");
    expect(res.status).not.toHaveBeenCalled();
  });
});
