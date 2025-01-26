"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

const SignedInLinks = new Map([
  ["Rank Characters", "/rank"],
  ["Your List", "/list"],
]);

export default function NavSignin() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      setIsSignedIn(!!session);
    };
    checkSession();
  }, []);

  return (
    <>
      {isSignedIn ? (
        <>
          {[...SignedInLinks.entries()].map(([name, path]) => (
            <Link
              href={path}
              key={name}
              className="hover:text-emerald-500 hover:bg-slate-800 p-1 mx-2 rounded-lg"
            >
              {name}
            </Link>
          ))}
        </>
      ) : (
        <div>Discord SignIn Here</div>
      )}
    </>
  );
}