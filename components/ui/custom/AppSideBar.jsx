import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../button";
import { MessageCircleCode } from "lucide-react";
import WorkspaceHistory from "./WorkspaceHistory";
import Footer from "./Footer";
function AppSideBar() {
  return (
    <Sidebar>
      <SidebarHeader>
        {/* <Image src={"/logo.png"} alt="flash" width={30} height={30} /> */}
      </SidebarHeader>
      <SidebarContent className="p-5">
        <Button>
          <MessageCircleCode />
          New Chat
        </Button>
        <SidebarGroup>
          <WorkspaceHistory />
        </SidebarGroup>
        {/* <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter>
        <Footer />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;
