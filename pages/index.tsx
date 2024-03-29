import React from "react";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

import useCurrentUser from "../hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <React.Fragment>
      <h1 className="text-3xl text-emerald-600 font-semibold">Netflix Clone</h1>
      <p className="text-white">Logged in as : {user?.name}</p>
      <button className="h-10 w-full bg-slate-50" onClick={() => signOut()}>
        Logout
      </button>
    </React.Fragment>
  );
}
