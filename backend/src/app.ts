import express from "express";
import cors from "cors";
import itemsRouter from "./routes/items.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/items", itemsRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
