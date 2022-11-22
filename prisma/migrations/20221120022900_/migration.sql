/*
  Warnings:

  - You are about to alter the column `closingDate` on the `Card` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.
  - You are about to alter the column `dueDate` on the `Card` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.
  - Added the required column `description` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardId` to the `CardExpense` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "limit" REAL NOT NULL,
    "dueDate" INTEGER NOT NULL,
    "closingDate" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Card_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("accountId", "closingDate", "dueDate", "id", "limit", "nome", "userId") SELECT "accountId", "closingDate", "dueDate", "id", "limit", "nome", "userId" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "repeatId" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "ignore" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("accountId", "categoryId", "date", "frequency", "id", "ignore", "repeatId", "status", "type", "userId", "value") SELECT "accountId", "categoryId", "date", "frequency", "id", "ignore", "repeatId", "status", "type", "userId", "value" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE TABLE "new_CardExpense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "invoiceDate" DATETIME NOT NULL,
    "repeatId" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "ignore" BOOLEAN NOT NULL,
    "categoryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    CONSTRAINT "CardExpense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CardExpense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CardExpense_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CardExpense_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CardExpense" ("accountId", "categoryId", "date", "frequency", "id", "ignore", "invoiceDate", "repeatId", "userId", "value") SELECT "accountId", "categoryId", "date", "frequency", "id", "ignore", "invoiceDate", "repeatId", "userId", "value" FROM "CardExpense";
DROP TABLE "CardExpense";
ALTER TABLE "new_CardExpense" RENAME TO "CardExpense";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
