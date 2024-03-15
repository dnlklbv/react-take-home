import { useSession, signOut, signIn } from "next-auth/react";

export default function Nav() {
  const session = useSession();
  const isAuthenticated = !!session?.data?.user;

  return (
    <nav className="w-full flex justify-end items-center">
      <button
        className="mr-6"
        onClick={() => {
          if (isAuthenticated) {
            signOut({ callbackUrl: "http://localhost:3000" });
          } else {
            signIn("github", { callbackUrl: "http://localhost:3000" });
          }
        }}
      >
        {isAuthenticated ? "Sign Out" : "Sign In"}
      </button>
      {session?.data?.user?.email}
    </nav>
  );
}
