import { Profile, User } from "@prisma/client";
import { AppContext } from "next/app";
import { User as UserComponent } from "../components/User";
import { getUser } from "../lib/Session";
import Create from "./user/create";
import Login from "./user/login";
import styles from "./_app.module.scss";

const HatebuApp = ({ Component, pageProps }: { Component: any, pageProps: AppProps }) => {
  return (
    <>
    <div className={styles.header}>
      <h1><a href="/">Page comment</a></h1>
      {pageProps.user && <UserComponent user={pageProps.user} />}
    </div>
    <div>
      <Component {...pageProps} />
    </div>
    </>
  );
}

HatebuApp.getInitialProps = async ({ ctx, Component }: AppContext) => {
  const user = await getUser(ctx.req!);
  if (!user) {
    if (!(Component === Login || Component === Create)) {
      return ctx.res?.writeHead(302, { Location: "/user/login" }).end();
    }
  }
  const props = await Component.getInitialProps?.(ctx) ?? {};
  return { pageProps: { ...props, user } };
}

export interface AppProps {
  user?: User & { profile?: Profile };
}

export default HatebuApp;
