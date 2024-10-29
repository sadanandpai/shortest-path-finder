import Link from "next/link";

export function NavBar() {
  return (
    <nav className="navbar" role="navigation">
      <h1>
        <Link href="/">PureFrontend</Link>
      </h1>
    </nav>
  );
}
