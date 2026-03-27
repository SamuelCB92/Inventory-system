import request from "supertest";
import app from "../app";
import { prisma, cleanupDatabase, closeDatabase } from "./setup";

beforeAll(async () => {
  await cleanupDatabase();
});

afterEach(async () => {
  await cleanupDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe("Items API", () => {
  describe("POST /items", () => {
    it("should create an item with valid data", async () => {
      const res = await request(app)
        .post("/items?lang=en")
        .send({ name: "Laptop", quantity: 5 });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe("Laptop");
      expect(res.body.data.quantity).toBe(5);
    });

    it("should return error when name is missing", async () => {
      const res = await request(app)
        .post("/items?lang=en")
        .send({ quantity: 5 });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Name is required");
    });

    it("should return error when quantity is negative", async () => {
      const res = await request(app)
        .post("/items?lang=en")
        .send({ name: "Laptop", quantity: -1 });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should return Portuguese message when lang=pt-BR", async () => {
      const res = await request(app)
        .post("/items?lang=pt-BR")
        .send({ quantity: 5 });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Nome é obrigatório");
    });
  });

  describe("GET /items", () => {
    it("should list all items", async () => {
      await request(app).post("/items").send({ name: "Laptop", quantity: 5 });

      const res = await request(app).get("/items?lang=en");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.items.length).toBe(1);
    });

    it("should return empty list when no items exist", async () => {
      const res = await request(app).get("/items?lang=en");

      expect(res.status).toBe(200);
      expect(res.body.data.items.length).toBe(0);
    });
  });

  describe("GET /items/:id", () => {
    it("should get a single item", async () => {
      const createRes = await request(app)
        .post("/items")
        .send({ name: "Mouse", quantity: 10 });

      const itemId = createRes.body.data.id;

      const res = await request(app).get(`/items/${itemId}?lang=en`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe("Mouse");
    });

    it("should return 404 for non-existent item", async () => {
      const res = await request(app).get("/items/invalid-id?lang=en");

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe("PATCH /items/:id", () => {
    it("should update an item", async () => {
      const createRes = await request(app)
        .post("/items")
        .send({ name: "Keyboard", quantity: 3 });

      const itemId = createRes.body.data.id;

      const res = await request(app)
        .patch(`/items/${itemId}?lang=en`)
        .send({ quantity: 15 });

      expect(res.status).toBe(200);
      expect(res.body.data.quantity).toBe(15);
    });

    it("should return 404 when updating non-existent item", async () => {
      const res = await request(app)
        .patch("/items/invalid-id?lang=en")
        .send({ quantity: 10 });

      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /items/:id", () => {
    it("should delete an item", async () => {
      const createRes = await request(app)
        .post("/items")
        .send({ name: "Monitor", quantity: 2 });

      const itemId = createRes.body.data.id;

      const deleteRes = await request(app).delete(`/items/${itemId}?lang=en`);

      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.success).toBe(true);

      const getRes = await request(app).get(`/items/${itemId}`);
      expect(getRes.status).toBe(404);
    });

    it("should return 404 when deleting non-existent item", async () => {
      const res = await request(app).delete("/items/invalid-id?lang=en");

      expect(res.status).toBe(404);
    });
  });

  describe("Health check", () => {
    it("should return health status", async () => {
      const res = await request(app).get("/health");

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("ok");
    });
  });
});
