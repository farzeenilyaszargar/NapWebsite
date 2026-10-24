import Link from "next/link";
import PlainShell from "./components/plain-shell";

export default function NotFound() {
  return (
    <PlainShell>
      <h1>this page took a nap.</h1>
      <p>404. There&apos;s nothing at this address. The link might be old, or the page might have moved.</p>
      <p><Link href="/">back to nap →</Link></p>
    </PlainShell>
  );
}
