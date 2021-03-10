import { PrismaClient } from "@prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { clearSession, getUser } from "../../../../lib/Session";

const logout: NextApiHandler = (req, res) => {
  switch (req.method?.toUpperCase()) {
    case "POST":
      return post(req, res);
    default:
      return res.writeHead(500).json({ error: "Method not supported." });
  }
}

const client = new PrismaClient();
async function post(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUser(req);
  client.session.deleteMany({ where: { userId: user!.id } })
  clearSession(res).writeHead(200).json({});
}

export default logout;
