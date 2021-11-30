import { useLocation } from "react-router";

export function getRouterTitle(routers, path) {
  return routers.find((router) => router.pathname === `/${path}`)?.title;
}

export function getRouterLastSubDirectory(pathname) {
  const subDirectories = pathname.split("/");
  return subDirectories[subDirectories.length - 1];
}

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
