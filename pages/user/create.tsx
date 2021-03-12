import { NextPage } from "next";
import { useState } from "react";
import { Apis } from "../../lib/Api";
import { getUser } from "../../lib/Session";
import styles from "./create.module.scss";

const Create: NextPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [doubleCheckPassword, setDoubleCheckPassword] = useState("");
  async function createUser() {
    await Apis.v1.users.create(id, password);
    location.reload();
  }

  return (
    <>
    <div>
      <div className={styles.loginContainer}>
        <input value={id} placeholder="ID" onChange={e => setId(e.target.value)} />
        <input value={password} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <input value={doubleCheckPassword} type="password" placeholder="Double check password" onChange={e => setDoubleCheckPassword(e.target.value)} />
        <button onClick={createUser}>register</button>
      </div>
    </div>
    </>
  );
}

Create.getInitialProps = async (ctx) => {
  const user = await getUser(ctx.req!);
  if (user) {
    return ctx.res?.writeHead(302, { Location: "/" }).end();
  }
  return {};
}

export default Create;
