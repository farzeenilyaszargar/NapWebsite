import releaseConfig from "../../tools/macos-signing-test/release-config.json";

export const signingTest: { version: string; downloadUrl: string | null; sha256: string | null; feedUrl: string } = {
  version: releaseConfig.version,
  downloadUrl: null,
  sha256: null,
  feedUrl: `${releaseConfig.publicBaseUrl}/${releaseConfig.prefix}/appcast.xml`,
};

export function parseSigningTestRelease(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const data = value as Record<string, unknown>;
  if (data.verified !== true || typeof data.version !== "string" || !/^\d+\.\d+\.\d+$/.test(data.version) ||
    typeof data.sha256 !== "string" || !/^[a-f0-9]{64}$/.test(data.sha256) || typeof data.downloadUrl !== "string") return null;
  try {
    const url = new URL(data.downloadUrl);
    if (url.origin !== releaseConfig.publicBaseUrl || url.username || url.password || url.search || url.hash ||
      url.pathname !== `/${releaseConfig.prefix}/releases/Nap-Signing-Test-${data.version}.dmg`) return null;
  } catch { return null; }
  return { version: data.version, sha256: data.sha256, downloadUrl: data.downloadUrl, feedUrl: signingTest.feedUrl };
}

export async function loadSigningTestRelease() {
  try {
    const response = await fetch(`${releaseConfig.publicBaseUrl}/${releaseConfig.prefix}/latest.json`, {
      next: { revalidate: 60 }, signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) return signingTest;
    return parseSigningTestRelease(await response.json()) || signingTest;
  } catch { return signingTest; }
}
