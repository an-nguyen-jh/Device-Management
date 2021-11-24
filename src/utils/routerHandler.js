export function getRouterTitle(routers, path) {
  return routers.find((router) => router.pathname === `/${path}`)?.title;
}

export function getRouterLastSubDirectory(pathname) {
  const subDirectories = pathname.split("/");
  return subDirectories[subDirectories.length - 1];
}
