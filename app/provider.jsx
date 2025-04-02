// "use client";
// import React from "react";

// function Provider({ children }) {
//   return <div>{children};</div>;
// }

// export default Provider;


"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
