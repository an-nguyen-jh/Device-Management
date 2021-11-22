export function getRouterTile(routers, path) {
  return routers.find((router) => router.pathname === `/${path}`)?.title;
}
