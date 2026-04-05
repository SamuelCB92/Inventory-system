import request from "supertest";
import app from "../app";
import { cleanupDatabase, closeDatabase } from "./setup";

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

    it("should create an item with optional fields", async () => {
      const res = await request(app)
        .post("/items?lang=en")
        .send({
          name: "Keyboard",
          quantity: 10,
          sku: "KB-001",
          category: "Electronics",
          description: "Mechanical keyboard",
          lowStockThreshold: 3,
        });

      expect(res.status).toBe(201);
      expect(res.body.data.sku).toBe("KB-001");
      expect(res.body.data.category).toBe("Electronics");
      expect(res.body.data.lowStockThreshold).toBe(3);
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

    it("should return 409 when SKU already exists", async () => {
      await request(app)
        .post("/items")
        .send({ name: "Laptop", quantity: 5, sku: "LAP-001" });

      const res = await request(app)
        .post("/items?lang=en")
        .send({ name: "Laptop Pro", quantity: 3, sku: "LAP-001" });

      expect(res.status).toBe(409);
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
    it("should list items with pagination metadata", async () => {
      await request(app).post("/items").send({ name: "Laptop", quantity: 5 });

      const res = await request(app).get("/items?lang=en");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.items.length).toBe(1);
      expect(res.body.data.total).toBe(1);
      expect(res.body.data.page).toBe(1);
      expect(res.body.data.totalPages).toBe(1);
    });

    it("should return empty list when no items exist", async () => {
      const res = await request(app).get("/items?lang=en");

      expect(res.status).toBe(200);
      expect(res.body.data.items.length).toBe(0);
      expect(res.body.data.total).toBe(0);
    });

    it("should filter items by search term", async () => {
      await request(app).post("/items").send({ name: "Laptop", quantity: 5 });
      await request(app).post("/items").send({ name: "Mouse", quantity: 10 });

      const res = await request(app).get("/items?search=laptop");

      expect(res.status).toBe(200);
      expect(res.body.data.items.length).toBe(1);
      expect(res.body.data.items[0].name).toBe("Laptop");
    });

    it("should filter items by category", async () => {
      await request(app)
        .post("/items")
        .send({ name: "Laptop", quantity: 5, category: "Electronics" });
      await request(app)
        .post("/items")
        .send({ name: "Desk", quantity: 2, category: "Furniture" });

      const res = await request(app).get("/items?category=Electronics");

      expect(res.status).toBe(200);
      expect(res.body.data.items.length).toBe(1);
      expect(res.body.data.items[0].category).toBe("Electronics");
    });

    it("should paginate correctly", async () => {
      for (let i = 1; i <= 15; i++) {
        await request(app)
          .post("/items")
          .send({ name: `Item ${i}`, quantity: i });
      }

      const res = await request(app).get("/items?page=2&limit=10");

      expect(res.status).toBe(200);
      expect(res.body.data.items.length).toBe(5);
      expect(res.body.data.page).toBe(2);
      expect(res.body.data.totalPages).toBe(2);
      expect(res.body.data.total).toBe(15);
    });
  });

  describe("GET /items/low-stock", () => {
    it("should return items where quantity is at or below threshold", async () => {
      await request(app)
        .post("/items")
        .send({ name: "Low Item", quantity: 2, lowStockThreshold: 5 });
      await request(app)
        .post("/items")
        .send({ name: "OK Item", quantity: 20, lowStockThreshold: 5 });

      const res = await request(app).get("/items/low-stock");

      expect(res.status).toBe(200);
      expect(res.body.data.items.length).toBe(1);
      expect(res.body.data.items[0].name).toBe("Low Item");
    });

    it("should not include items with threshold of 0", async () => {
      await request(app)
        .post("/items")
        .send({ name: "No Threshold", quantity: 0, lowStockThreshold: 0 });

      const res = await request(app).get("/items/low-stock");

      expect(res.status).toBe(200);
      expect(res.body.data.items.length).toBe(0);
    });
  });

  describe("GET /items/categories", () => {
    it("should return distinct categories", async () => {
      await request(app)
        .post("/items")
        .send({ name: "Laptop", quantity: 5, category: "Electronics" });
      await request(app)
        .post("/items")
        .send({ name: "Monitor", quantity: 3, category: "Electronics" });
      await request(app)
        .post("/items")
        .send({ name: "Desk", quantity: 1, category: "Furniture" });

      const res = await request(app).get("/items/categories");

      expect(res.status).toBe(200);
      expect(res.body.data.categories).toHaveLength(2);
      expect(res.body.data.categories).toContain("Electronics");
      expect(res.body.data.categories).toContain("Furniture");
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
    it("should update an item quantity", async () => {
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

    it("should update an item name", async () => {
      const createRes = await request(app)
        .post("/items")
        .send({ name: "Old Name", quantity: 3 });

      const itemId = createRes.body.data.id;

      const res = await request(app)
        .patch(`/items/${itemId}?lang=en`)
        .send({ name: "New Name" });

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("New Name");
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

describe("POST /items validation", () => {
  it("should return 400 for name not string", async () => {
    const response = await request(app)
      .post("/items")
      .send({ name: 123, quantity: 5 });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Name must be a string");
  });

  it("should return 400 for quantity not integer", async () => {
    const response = await request(app)
      .post("/items")
      .send({ name: "Test", quantity: 3.5 });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Quantity must be a non-negative integer");
  });

  it("should return 400 for negative lowStockThreshold", async () => {
    const response = await request(app)
      .post("/items")
      .send({ name: "Test", quantity: 5, lowStockThreshold: -1 });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
      "Low stock threshold must be a non-negative integer",
    );
  });
});

describe("PATCH /items/:id validation", () => {
  it("should return 400 for quantity not integer on update", async () => {
    const createResponse = await request(app)
      .post("/items")
      .send({ name: "Test", quantity: 1 });
    const id = createResponse.body.data.id;

    const response = await request(app)
      .patch(`/items/${id}`)
      .send({ quantity: "not a number" });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Quantity must be a non-negative integer");
  });
});
