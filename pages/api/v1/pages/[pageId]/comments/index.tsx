import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";
import { client } from "../../../../../../lib/PrismaClient";
import { getUser } from "../../../../../../lib/Session";

const Comments: NextApiHandler = async (req, res) => {
  switch (req.method?.toUpperCase()) {
    case "POST":
      return post(req, res);
    default:
      return res.writeHead(500).json({ error: "Method not supported." });
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUser(req);
  if (!user) {
    return res.writeHead(500).json({ error: "Not logged in." });
  }
  const id = v4();
  const { pageId } = req.query;
  const { content, x, y } = req.body;
  const created = await client.comment.create({
    data: {
      content, id, x, y,
      userId: user.id,
      pageId: pageId as string
    }
  });
  return res.json(created);
}

export default Comments;
