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
  const flatRouters = [];
  routers.forEach((router) => {
    flatRouters.push({
      pathname: router.pathname,
      component: router.component,
    });
    if (router.hasDetailsPage) {
      flatRouters.push({
        pathname: `${router.pathname}/:id`,
        component: router.hasDetailsPage.component,
      });
    }
  });
  return flatRouters;
}

export function getCurrentPathWithoutLastPart(pathname) {
  return pathname.slice(0, pathname.lastIndexOf("/"));
}
