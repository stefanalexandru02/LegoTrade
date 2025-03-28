import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import { AppRoutes, AuthRoutes } from "./AppRoutes";

export default function App() {
  return (
    <>
      <Routes>
        {AuthRoutes.map((route, index) => {
          const { element, canSkipAuth, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, canSkipAuth, ...rest } = route;
          return (
            <Route
              key={index}
              {...rest}
              element={
                <Layout>
                  <AuthorizeRoute {...rest} element={element} />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}
