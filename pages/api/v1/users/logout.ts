import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../../lib/PrismaClient";
import { clearSession, getUser } from "../../../../lib/Session";

const logout: NextApiHandler = (req, res) => {
  switch (req.method?.toUpperCase()) {
    case "POST":
      return post(req, res);
    default:
      return res.writeHead(500).json({ error: "Method not supported." });
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUser(req);
  await client.session.deleteMany({ where: { userId: user!.id } })
  clearSession(res).json({});
}

export default logout;
