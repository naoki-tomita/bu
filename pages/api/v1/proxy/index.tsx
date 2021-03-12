import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { URL } from "url";

const Proxy: NextApiHandler = async (req, res) => {
  switch (req.method?.toUpperCase()) {
    case "GET":
      return get(req, res);
    default:
      return res.writeHead(500).json({ error: "Method not supported." });
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  const parsedUrl = new URL(url as string);
  const html = await fetch(parsedUrl.href).then(it => it.text())

  res
    .writeHead(200, { "content-type": "text/html" })
    .end(
      html
        .replace(/\n/g, " ")
        .replace(/<head>/, `<head><base href="${parsedUrl.origin}">`)
        .replace(/<script(.*?)>(.*?)<\/script>/g, ``)
    );
}

export default Proxy;
