// "use client";
// import React from "react";

// function Provider({ children }) {
//   return <div>{children};</div>;
// }

// export default Provider;

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/ui/custom/Header";
import { MessagesContext } from "@/context/MessagesContext";
import { useEffect, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

function Provider({ children }) {
  const [messages, setMessages] = useState();
  const [userDetail, setUserDetail] = useState();

  // const user = JSON.parse(localStorage.getItem("user"));
  const convex = useConvex();
  useEffect(() => {
    IsAuthenticated();
  }, []);

  // const IsAuthenticated = async () => {
  //   if (typeof window !== "undefined") {
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     const result = await convex.query(api.users.GetUser, {
  //       email: user?.email,
  //     });
  //     setUserDetail(result);
  //     console.log(result);
  //   }
  // };
  const IsAuthenticated = async () => {
    if (typeof window !== "undefined") {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (user && user.email) {
          const result = await convex.query(api.users.GetUser, {
            email: user.email,
          });
          setUserDetail(result);
          console.log(result);
        }
      } catch (error) {
        console.error("Authentication error:", error);
      }
    }
  };
  return (
    <div>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}
      >
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <MessagesContext.Provider value={{ messages, setMessages }}>
            <NextThemesProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
            </NextThemesProvider>
          </MessagesContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </div>
  );
}
export default Provider;
