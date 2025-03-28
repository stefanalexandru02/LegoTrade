import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import AppRoutes from "./AppRoutes";

export default function App() {
  return (
    <Layout>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, requireAuth, ...rest } = route;
          return (
            <Route
              key={index}
              {...rest}
              element={
                requireAuth ? (
                  <AuthorizeRoute {...rest} element={element} />
                ) : (
                  element
                )
              }
            />
          );
        })}
      </Routes>
    </Layout>
  );
}
