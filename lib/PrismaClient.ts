import { PrismaClient } from ".prisma/client";

let client: PrismaClient;

export function getClient() {
  return client = client ?? new PrismaClient();
}
