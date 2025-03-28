import React from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";

interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div>
      <NavMenu />
      <Container tag="main">{children}</Container>
    </div>
  );
}
