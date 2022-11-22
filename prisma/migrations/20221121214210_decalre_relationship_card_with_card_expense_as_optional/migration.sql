-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CardExpense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "description" TEXT NOT NULL,
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
    CONSTRAINT "CardExpense_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CardExpense" ("accountId", "cardId", "categoryId", "date", "description", "frequency", "id", "ignore", "invoiceDate", "repeatId", "userId", "value") SELECT "accountId", "cardId", "categoryId", "date", "description", "frequency", "id", "ignore", "invoiceDate", "repeatId", "userId", "value" FROM "CardExpense";
DROP TABLE "CardExpense";
ALTER TABLE "new_CardExpense" RENAME TO "CardExpense";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
