import Link from "next/link";
import MenuClock from "./menu-clock";

// The menu bar: the ghost sits where the Apple menu would, then the only menu, Blogs.
export default function NapHeader() {
  return (
    <header className="nap-header">
      <nav className="nap-header-inner" aria-label="Main navigation">
        <Link href="/" className="nap-logo" aria-label="Nap home"><img className="nap-logo-mark" src="/nap-ghost-menu-5a695530.png" width={14} height={16} alt="" /></Link>
        <Link className="nap-docs" href="/blogs">Blogs</Link>
        <MenuClock />
      </nav>
    </header>
  );
}
