"use client";

import AppLogoHeader from "./app-logo-header";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useClientMediaQuery } from "@/hooks/useClientMediaQuery";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/authentication/logout";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function AppHeader({ headerOnly = false, fixed = false }) {
  const pathname = usePathname();
  const router = useRouter();

  const { state, openMobile } = useSidebar();

  const pathMap: { [key: string]: string } = {
    "/student/dashboard": "Dashboard",
    "/student/courses": "Courses",
    "/student/assessments": "Assessments",
    "/student/learning-resources": "Learning Resources",
    "/student/grades": "Grades",
    "/student/profile": "Profile",
    "/admin/dashboard": "Dashboard",
    "/admin/manage-users": "Users",
    "/admin/manage-courses": "Courses",
    "/admin/profile": "Profile",
  };

  let currentPath =
    Object.keys(pathMap).find((path) => pathname.startsWith(path)) || "";
  currentPath = pathMap[currentPath] || "";

  const isMobile = useClientMediaQuery("(max-width: 600px)");

  async function logoutUser() {
    startTransition(() => {
      logout().then((response) => {
        const { redirectURL } = response;
        router.push(redirectURL);
      });
    });
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between w-full h-14 pl-4 pr-8 transition-all duration-300 z-50",
        state === "collapsed" || isMobile ? "bg-darkGreen-500 text-white" : "",
        fixed === true ? "fixed" : ""
      )}
    >
      <div className="flex items-center gap-4">
        {isMobile ? (
          <>{!headerOnly && <SidebarTrigger />}</>
        ) : (
          <>
            {!headerOnly && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarTrigger />
                  </TooltipTrigger>
                  <TooltipContent>Toggle Sidebar</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </>
        )}
        <AppLogoHeader
          className={cn(
            "transition-all duration-1000",
            state === "collapsed" || isMobile
              ? "opacity-100"
              : "sr-only opacity-0",
            openMobile && "opacity-0"
          )}
        />
        {state === "expanded" ? (
          <div className="hidden md:block text-xl font-medium">
            {currentPath}
          </div>
        ) : null}
      </div>
      <div className="flex items-center">
        <Button
          variant="ghost"
          onClick={logoutUser}
          className="flex items-center gap-2 p-2 m-0 w-full"
        >
          <LogOut />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}
