-- CreateTable
CREATE TABLE "Session" (
    "id" VARCHAR(36) NOT NULL,
    "userId" VARCHAR(128) NOT NULL,
    "expiresAt" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_userId_unique" ON "Session"("userId");

-- AddForeignKey
ALTER TABLE "Session" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
