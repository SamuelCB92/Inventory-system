import { Router } from "express";
import bcrypt from "bcrypt";

const authRouter = Router();
let prisma: any = null;

authRouter.post("/register", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid input" });
  }

  if (!prisma) {
    const { PrismaClient } = await import("@prisma/client");
    prisma = new PrismaClient();
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: "Email already in use" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash: hashedPassword },
  });
  try {
    return res
      .status(201)
      .json({ id: user.id, email: user.email, createdAt: user.createdAt });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create user" });
  }
});

export default authRouter;
