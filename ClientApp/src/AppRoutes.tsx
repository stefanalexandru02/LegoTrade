import { JSX } from "react";
import ApiAuthorzationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";

// Extended route interface to include our custom properties
interface CustomRouteObject {
  index?: boolean;
  path?: string;
  requireAuth?: boolean;
  element: JSX.Element;
}

const AppRoutes: CustomRouteObject[] = [
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
    requireAuth: true,
    element: <FetchData />,
  },
  ...ApiAuthorzationRoutes,
];

export default AppRoutes;
