import { PrismaClient, User } from "@prisma/client";
import { NextPage } from "next";
import { useState } from "react";
import { Apis } from "../../lib/Api";
import { getUser } from "../../lib/Session";
import styles from "./login.module.scss";

const Login: NextPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  async function login() {
    await Apis.v1.users.login(id, password);
    location.reload();
  }
  return (
    <>
    <div>
      <div className={styles.loginContainer} style={{ display: "flex", flexDirection: "column", width: 250, margin: "auto" }}>
        <input value={id} placeholder="ID" onChange={e => setId(e.target.value)} />
        <input value={password} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button onClick={login}>login</button>
        <a href="/user/create">create account</a>
      </div>
    </div>
    </>
  );
}

Login.getInitialProps = async (ctx) => {
  const user = await getUser(ctx.req!);
  if (user) {
    return ctx.res?.writeHead(302, { Location: "/" }).end();
  }
  return {};
}

export default Login;
