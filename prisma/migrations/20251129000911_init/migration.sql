-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "accessCode" TEXT NOT NULL,
    "photoBase64" TEXT,
    "name" TEXT,
    "title" TEXT,
    "company" TEXT,
    "whatsapp" TEXT,
    "email" TEXT,
    "website" TEXT,
    "instagram" TEXT,
    "linkedin" TEXT,
    "gradient" TEXT DEFAULT 'linear-gradient(180deg, #ffffff 0%, #a0a0a0 100%)',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_slug_key" ON "Card"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Card_accessCode_key" ON "Card"("accessCode");
