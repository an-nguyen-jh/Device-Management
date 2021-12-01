import { useLocation } from "react-router";

export function getRouterTitle(routers, path) {
  return routers.find((router) => router.pathname === `/${path}`)?.title;
}

export function getRouterSubDirectories(pathname) {
  const subDirectories = pathname.split("/");
  return subDirectories;
}

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
