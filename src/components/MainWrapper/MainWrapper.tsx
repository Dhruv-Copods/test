import * as React from "react";

export const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex h-screen">{children}</div>;
};
