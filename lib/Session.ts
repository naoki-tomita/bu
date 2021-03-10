import { PrismaClient } from "@prisma/client";
import { parse } from "cookie";
import { NextApiResponse } from "next";
import { IncomingMessage } from "node:http";

const SessionKey = "BUSESSION"

export function setSession(res: NextApiResponse, value: string) {
  res.setHeader("set-cookie", `${SessionKey}=${value};Path=/;Max-Age=3600;`);
  return res;
}

export function clearSession(res: NextApiResponse) {
  res.setHeader("set-cookie", `${SessionKey}=;Max-Age=-1;`);
  return res;
}

export function getSession(req: IncomingMessage): string | undefined {
  const cookie = req?.headers.cookie ?? "";
  console.log(cookie, "cookie");
  const session = parse(cookie)[SessionKey];
  console.log(session, "session");
  return session;
}

export async function getUser(req: IncomingMessage) {
  const client = new PrismaClient();
  const sessionId = getSession(req);
  if (!sessionId) {
    return undefined;
  }
  const session = await client.session.findFirst({ where: { id: sessionId }, include: { user: { include: { profile: true } } } });
  console.log(session, "session body")
  return session?.user;
}
