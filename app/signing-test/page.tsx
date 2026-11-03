import type { Metadata } from "next";
import NapHeader from "../components/nap-header";
import NapFooter from "../components/nap-footer";
import { loadSigningTestRelease } from "../lib/signing-test";
import "../contrast.css";
import styles from "./signing-test.module.css";

const title = "Nap | Signing Test";
const description = "A separate Mac test app for verifying Nap's Developer ID signing, notarization, and installer download. This is not the Nap product.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/signing-test" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: { title, description, url: "/signing-test" },
  twitter: { title, description },
};

export default async function SigningTestPage() {
  const signingTest = await loadSigningTestRelease();
  const { downloadUrl, sha256 } = signingTest;
  return (
    <main className={`contrast-page ${styles.page}`}>
      <NapHeader showDownload={false} />
      <section className={styles.content} aria-labelledby="signing-test-title">
        <img className={styles.logo} src="/nap-ghost-header.png" width={48} height={54} alt="" />
        <h1 id="signing-test-title">Nap signing test.</h1>
        <p>A small Mac app for testing our signed installer. This is a release-pipeline test, not the Nap product.</p>
        {downloadUrl && sha256 ? (
          <>
            <a className="nap-mac-download" href={downloadUrl}>
              <span>Download signing test</span>
              <img src="/apple-mark.svg" width={11} height={14} alt="" />
            </a>
            <p className={styles.details}>Version {signingTest.version} · macOS 12 or later · Apple Silicon and Intel</p>
            <h2>Try it on your Mac.</h2>
            <ol>
              <li>Download the DMG using Safari, then open it.</li>
              <li>Drag Nap Signing Test into Applications and launch it normally.</li>
              <li>Click Test the app. A normal first-open confirmation is expected; a damaged-app or unidentified-developer warning is not.</li>
            </ol>
            <p>Do not disable Gatekeeper, remove quarantine, or use Open Anyway for this test.</p>
            <p>Use Check for Updates in the app to test future signed releases.</p>
            <details className={styles.checksum}>
              <summary>SHA-256 checksum</summary>
              <code>{sha256}</code>
            </details>
          </>
        ) : (
          <div className={styles.pending} role="status">
            <h2>Download pending verification.</h2>
            <p>The installer will appear here after Apple notarization and our final checks are complete.</p>
          </div>
        )}
        <p className={styles.details}><a className="nap-inline-link" href={signingTest.feedUrl}>Signed update feed</a></p>
      </section>
      <NapFooter />
    </main>
  );
}
