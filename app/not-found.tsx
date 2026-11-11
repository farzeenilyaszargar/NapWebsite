import Link from "next/link";

export default function NotFound() {
  return <main><h1>404.</h1><p>This page went outside. You should try it.</p><p><Link href="/">Back to Nap →</Link></p></main>;
}
