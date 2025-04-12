// "use client";


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ConvexClientProvider } from "./ConvexClientProvider";
// import { ThemeProvider } from "./provider";
// import Header from "@/components/ui/custom/Header";
// import { MessagesContext } from "@/context/MessagesContext";
// import { useState } from "react";
// import { UserDetailContext } from "@/context/UserDetailContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  // const [messages, setMessages] = useState();
  // const [userDetail, setUserDetail] = useState();
  return (
    <html lang="en" suppressContentEditableWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <UserDetailContext.Provider value={{userDetail, setUserDetail }}>
          <MessagesContext.Provider value={{ messages, setMessages }}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header /> */}
        <ConvexClientProvider>
          <Provider>{children}</Provider>
        </ConvexClientProvider>
        {/* </ThemeProvider>
          </MessagesContext.Provider>
        </UserDetailContext.Provider> */}
      </body>
    </html>
  );
}
