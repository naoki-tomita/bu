import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getClient } from "../../../../../lib/PrismaClient";

const Comments: NextApiHandler = async (req, res) => {
  switch (req.method?.toUpperCase()) {
    case "DELETE":
      return deletes(req, res);
    default:
      return res.writeHead(500).json({ error: "Method not supported." });
  }
}

async function deletes(req: NextApiRequest, res: NextApiResponse) {
  const { pageId } = req.query as { pageId: string };
  console.log(pageId);
  await getClient().comment.deleteMany({ where: { pageId } });
  await getClient().page.deleteMany({ where: { id: pageId } });
  return res.json({});
}

export default Comments;
