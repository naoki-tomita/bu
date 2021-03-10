-- CreateTable
CREATE TABLE "Page" (
    "id" VARCHAR(36) NOT NULL,
    "url" VARCHAR(4096) NOT NULL,
    "title" VARCHAR(1024) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(128) NOT NULL,
    "password" VARCHAR(64) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "userId" VARCHAR(128) NOT NULL,
    "name" VARCHAR(256),

    PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" VARCHAR(36) NOT NULL,
    "userId" VARCHAR(128) NOT NULL,
    "pageId" VARCHAR(36) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Page.url_unique" ON "Page"("url");

-- AddForeignKey
ALTER TABLE "Profile" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
