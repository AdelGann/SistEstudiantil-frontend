export function parseJwt(token: string | undefined | null) {
  if (!token) {
    return undefined;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}
