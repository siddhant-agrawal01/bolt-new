"use client";

import { ActionContext } from "@/context/ActionContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useSidebar } from "../sidebar";
import Link from "next/link";
import { Button } from "../button";
import Colors from "@/data/Colors";
import Image from "next/image";
import { LucideDownload } from "lucide-react";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { toggleSidebar } = useSidebar();
  const path = usePathname();

  const { action, setAction } = useContext(ActionContext);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onActionButton = (action) => {
    setAction({
      actionType: action,
      timeStamp: Date.now(),
    });
  };

  return (
    <header
      className={`fixed top-0   left-0 right-0 w-full z-50 ${
        isScrolled ? "backdrop-blur-md bg-green/70" : "bg-black/150"
      } transition-all duration-300`}
    >
      <div className="p-4 flex justify-between items-center border-b max-w-[1440px] mx-auto">
        <Link href={"/"}>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-yellow-500 mr-2"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
           <div className="text-2xl font-bold italic text-yellow-500">
Flash

           </div>
          </div>
        </Link>
        {!userDetail?.name ? (
          <div className="flex gap-5">
            <Button variant="ghost">Sign In</Button>
            <Button
              className="text-white"
              style={{
                backgroundColor: Colors.BLUE,
              }}
            >
              Get Started
            </Button>
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            {path?.includes("workspace") && (
              <>
                <Button
                  variant="ghost"
                  onClick={() => onActionButton("export")}
                  className="backdrop-blur-sm bg-white/10  hover:bg-white/20 transition-all"
                >
                  <LucideDownload className="mr-2" /> Export
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90 shadow-md backdrop-blur-sm"
                  onClick={() => onActionButton("deploy")}
                >
                  Deploy
                </Button>
              </>
            )}
            {userDetail && (
              <div
                className="flex items-center gap-2 ml-2 cursor-pointer rounded-full bg-white/10 backdrop-blur-sm p-1 px-2 "
                onClick={toggleSidebar}
              >
                <Image
                  src={userDetail?.picture || "https://via.placeholder.com/30"}
                  alt="user"
                  width={30}
                  height={30}
                  className="rounded-full w-[30px] h-[30px]"
                />
                <span className="text-sm font-medium hidden sm:inline">
                  {userDetail.name?.split(" ")[0]}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
