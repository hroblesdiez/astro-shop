const WP_BASE = 'http://138.2.172.187';
const PROXY_PATH = '/api/media';

export function rewriteImageUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith(WP_BASE)) {
    return url.replace(WP_BASE, PROXY_PATH);
  }
  return url;
}
