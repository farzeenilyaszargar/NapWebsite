import type { Metadata, Viewport } from "next";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "./bet.module.css";

const oldeTome = localFont({ src: "./OldeTome.ttf", display: "swap", variable: "--font-olde-tome" });

const appStoreUrl = process.env.NEXT_PUBLIC_LAST_BET_APP_STORE_URL;
const description = "One coin. One very unfair slot machine. Pull the lever, stack rule-bending boons, and take on the House in The Last Bet for iOS. No real money. Nothing to buy.";

export const metadata: Metadata = {
  title: "The Last Bet — One coin. One more spin.",
  description,
  applicationName: "The Last Bet",
  alternates: { canonical: "/bet" },
  icons: { icon: "/bet/spade.svg", apple: "/bet/spade.svg" },
  openGraph: { title: "The Last Bet — One coin. One more spin.", description, url: "/bet", siteName: "The Last Bet", type: "website", images: [{ url: "/bet/casino.webp", width: 2400, height: 1350, alt: "The Last Bet casino, glowing in the night" }] },
  twitter: { card: "summary_large_image", title: "The Last Bet — One coin. One more spin.", description, images: ["/bet/casino.webp"] },
};
export const viewport: Viewport = { themeColor: "#140d12" };

export default function BetPage() {
  return (
    <div className={`${styles.page} ${oldeTome.variable}`}>
      <video className={styles.background} src="/bet/background.mp4" poster="/bet/casino.webp" autoPlay loop muted playsInline controls={false} disablePictureInPicture disableRemotePlayback preload="auto" aria-hidden="true" tabIndex={-1} />
      <div className={styles.shade} aria-hidden="true" />
      <main className={styles.content}>
        <h1 className={styles.title}>The Last Bet</h1>
        <p className={styles.tagline}>You’re down to your last coin.<br className={styles.mobileBreak} /> Make the House regret it.</p>
        <figure className={styles.mockup} aria-label="The Last Bet running on an iPhone in landscape">
          <div className={styles.phone}>
            <div className={styles.screen}><video src="/bet/background.mp4" poster="/bet/gameplay.webp" autoPlay loop muted playsInline controls={false} disablePictureInPicture disableRemotePlayback preload="auto" aria-label="The Last Bet gameplay trailer" tabIndex={-1} /><span className={styles.island} aria-hidden="true" /><span className={styles.homeIndicator} aria-hidden="true" /></div>
          </div>
          <span className={styles.phoneShadow} aria-hidden="true" />
        </figure>
        <p className={styles.description}>Turn one coin into 100 quintillion. Stack boons that bend the rules.<br className={styles.desktopBreak} /> Survive a House that cheats differently every round.</p>
        <div className={styles.downloadArea}>
          {appStoreUrl ? <a className={styles.download} href={appStoreUrl} target="_blank" rel="noopener noreferrer" aria-label="Download The Last Bet on the App Store"><Image src="/apple.svg" width={25} height={31} alt="" aria-hidden="true" /><span><small>Download on the</small><strong>App Store</strong></span></a> : <div className={styles.download} role="status"><Image src="/apple.svg" width={25} height={31} alt="" aria-hidden="true" /><span><small>Coming to the</small><strong>App Store</strong></span></div>}
          <p className={styles.downloadNote}>{appStoreUrl ? "Available for iOS" : "iOS · Download link coming soon"}</p>
        </div>
      </main>
    </div>
  );
}
