import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { createHash } from "crypto";
import { v4 } from "uuid";
import { setSession } from "../../../../lib/Session";
import { PrismaClient } from "@prisma/client";

const login: NextApiHandler = (req, res) => {
  switch (req.method?.toUpperCase()) {
    case "POST":
      return post(req, res);
    default:
      return res.writeHead(500).json({ error: "Method not supported." });
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const client = new PrismaClient();
  const { id: userId, password } = req.body;
  const user = await client.user.findFirst({ where: { id: userId } });
  const cryptedPassword = createHash("sha256").update(password).digest("hex");
  if (user?.password === cryptedPassword) {
    const id = v4();
    const session = await client.session.create({
      data: { id, userId, expiresAt: Date.now() + 3600 * 1000 },
    });
    return setSession(res, session.id).json({});
  }
  res.writeHead(403).json({ error: "failed to login" });
}

export default login;
