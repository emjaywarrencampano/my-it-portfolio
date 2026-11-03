export const BASE_PATH = process.env.NODE_ENV === "production" ? "/my-it-portfolio" : "";

/**
 * Returns an asset path prefixed with the repository base path in production for GitHub Pages.
 */
export function assetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}
