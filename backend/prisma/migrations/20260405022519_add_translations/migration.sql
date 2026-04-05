-- AlterTable
ALTER TABLE "items" ADD COLUMN     "categoryPT" TEXT,
ADD COLUMN     "descriptionPT" TEXT,
ADD COLUMN     "namePT" TEXT,
ALTER COLUMN "quantity" SET DEFAULT 0;
