import { JSX } from "react";
import ApiAuthorzationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./pages/Home";

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
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/fetch-data",
    canSkipAuth: false,
    element: <FetchData />,
  },
];

export const AuthRoutes: CustomRouteObject[] = [...ApiAuthorzationRoutes];
