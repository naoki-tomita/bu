import { Page } from "@prisma/client";
import { NextPage } from "next";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useState } from "react";
import { Apis } from "../lib/Api";
import { getClient } from "../lib/PrismaClient";
import styles from "./index.module.scss";

interface InitialProps {
  pages: Page[];
}

const Home: NextPage<AppProps & InitialProps, InitialProps> = ({ pages }) => {
  const [url, setUrl] = useState("");

  async function registerUrl() {
    await Apis.v1.pages.create(url);
    location.reload();
  }

  async function deleteUrl(id: string) {
    await Apis.v1.pages.delete(id);
    location.reload();
  }

  return (
    <div style={{ maxWidth: 1024, position: "relative", margin: "auto" }}>
      <div style={{ display: "flex" }}>
        <input
          className={styles.url}
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <button style={{ width: 120, marginLeft: 8 }} onClick={registerUrl}>登録</button>
      </div>
      <ul>
        {pages.map(it => (
          <li key={it.id}><a href={`/pages/${it.id}`}>{it.title}</a> <button onClick={() => deleteUrl(it.id)}>x</button></li>
        ))}
      </ul>
    </div>
  );
}

Home.getInitialProps = async () => {
  const pages = await getClient().page.findMany();
  return { pages };
}

export default Home;
