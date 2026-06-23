//#region src/lib/image.ts
var WP_BASE = "http://138.2.172.187";
var PROXY_PATH = "/api/media";
function rewriteImageUrl(url) {
	if (!url) return void 0;
	if (url.startsWith(WP_BASE)) return url.replace(WP_BASE, PROXY_PATH);
	return url;
}
//#endregion
export { rewriteImageUrl as t };
