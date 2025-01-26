import Link from "next/link";
import NavSignin from "./navSignin";

const NavLinks = new Map([
  ["Frieren Stats Site", "/"],
  ["Community Ranking", "/community"],
  ["Search Users", "/"],
  ["Ranking Similarity", "/"],
  ["Character Correlation", "/"],
]);

export default function NavigationMenu() {
  return (
    <>
      <div className="fixed top-0 left-0 h-full min-w-70 bg-slate-700 flex flex-col items-start justify-start gap-4 py-4">
        {[...NavLinks.entries()].map(([name, path]) => (
          <Link
            href={path}
            key={name}
            className="hover:text-emerald-500 hover:bg-slate-800 p-1 mx-2 rounded-lg"
          >
            {name}
          </Link>
        ))}
        <div className="mt-auto"></div> {/* Spacer */}
        <NavSignin />
      </div>
    </>
  );
}
