import "../reveal.css";

export default function PlainShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="nap-reveal compact-home">
      <div className="compact-page secondary-page">{children}</div>
    </main>
  );
}
