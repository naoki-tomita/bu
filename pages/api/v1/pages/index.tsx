import { PrismaClient } from "@prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";
import { JSDOM } from "jsdom";

const Pages: NextApiHandler = async (req, res) => {
  switch (req.method?.toUpperCase()) {
    case "POST":
      return post(req, res);
    case "GET":
      return get(req, res);
    default:
      return res.writeHead(500).json({ error: "Method not supported." });
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const client = new PrismaClient();
  const { url } = req.body;

  const pages = await url
    ? client.page.findMany({ where: { url } })
    : client.page.findMany();
  return res.json(pages);
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const client = new PrismaClient();
  const id = v4();
  const { url } = req.body;
  const html = await fetch(url).then(it => it.text());
  const dom = new JSDOM(html);
  const title = dom.window.document.querySelector("title");
  const created = await client.page.create({ data: { id, url, title: title?.textContent ?? url } });
  return res.json(created);
}

export default Pages;
