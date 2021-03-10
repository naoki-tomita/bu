import { User as UserType, Profile } from "@prisma/client";
import { FC, useState } from "react";
import { Apis } from "../lib/Api";
import styles from "./User.module.scss";

export const User: FC<{ user: UserType & { profile?: Profile } }> = ({ user }) => {
  const [isOpen, setOpen] = useState(false);
  async function logout() {
    await Apis.v1.users.logout();
    location.reload();
  }
  return (
    <div style={{ position: "relative" }}>
      <a className={styles.opener} href="#" onClick={() => setOpen(!isOpen)}>
        <span>id: {user.id}</span>
      </a>
      {isOpen && (
        <>
        <div className={styles.user}>
          <div>name: {user.profile?.name ?? "no name"}</div>
          <button onClick={logout}>logout</button>
        </div>
        <div className={styles.backdrop} onClick={() => setOpen(false)}></div>
        </>
      )}
    </div>
  );
}
