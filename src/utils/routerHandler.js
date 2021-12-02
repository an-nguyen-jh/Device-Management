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

export function flattenRouters(routers) {
  const flattRouters = [];
  routers.forEach((router) => {
    flattRouters.push({
      pathname: router.pathname,
      component: router.component,
    });
    if (router.hasDetailsPage) {
      flattRouters.push({
        pathname: `${router.pathname}/:id`,
        component: router.hasDetailsPage.component,
      });
    }
  });
  return flattRouters;
}

export function getCurrentPathWithoutLastPart(pathname) {
  return pathname.slice(0, pathname.lastIndexOf("/"));
}
