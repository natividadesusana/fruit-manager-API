import supertest from "supertest";
import app from "app";

const server = supertest(app);

describe("GET /health", () => {
  it("should return status 200", async () => {
    const { status, text } = await server.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  });
});
