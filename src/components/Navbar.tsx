import Link from "next/link";

import { useSession, signIn, signOut } from "next-auth/react";

// Top navbar
export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">Home</button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {session?.user && (
          <>
            <li className="push-left">
              <Link href="/user">
                <button className="btn-blue">Profile</button>
              </Link>
            </li>
            <li>
              <Link href={`/${session.user.name}`}>
                {session.user.image && <img src={session.user.image} />}
              </Link>
            </li>
            <li>
              <button onClick={() => signOut()}>Sign out</button>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!session && (
          <li>
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
