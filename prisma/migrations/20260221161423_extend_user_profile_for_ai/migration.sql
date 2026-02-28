-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "avatar" TEXT,
    "os" TEXT,
    "characterClass" TEXT NOT NULL DEFAULT 'Graine',
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 0,
    "inventory" TEXT,
    "software" TEXT,
    "alignment" INTEGER NOT NULL DEFAULT 50,
    "unlockedNodes" TEXT NOT NULL DEFAULT '0.1',
    "completedNodes" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("characterClass", "completedNodes", "createdAt", "email", "id", "level", "name", "passwordHash", "role", "unlockedNodes", "updatedAt", "xp") SELECT "characterClass", "completedNodes", "createdAt", "email", "id", "level", "name", "passwordHash", "role", "unlockedNodes", "updatedAt", "xp" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
