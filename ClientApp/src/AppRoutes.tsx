import { JSX } from "react";
import ApiAuthorzationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { Counter } from "./pages/Counter";
import { FetchData } from "./pages/FetchData";
import { Home } from "./pages/Home";
import { MySets } from "./pages/MySets";
import { AddEditItem } from "./pages/AddEditItem";

// Extended route interface to include our custom properties
interface CustomRouteObject {
  index?: boolean;
  path?: string;
  canSkipAuth?: boolean;
  element: JSX.Element;
}

export const AppRoutes: CustomRouteObject[] = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/my-sets",
    element: <MySets />,
  },
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/fetch-data",
    canSkipAuth: false,
    element: <FetchData />,
  },
  {
    path: "/my-sets/add",
    element: <AddEditItem />,
    canSkipAuth: false,
  },
  {
    path: "/my-sets/edit/:id",
    element: <AddEditItem />,
    canSkipAuth: false,
  },
];

export const AuthRoutes: CustomRouteObject[] = [...ApiAuthorzationRoutes];
