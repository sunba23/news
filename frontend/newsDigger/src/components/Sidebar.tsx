import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Rss, Settings, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { authApi } from "@/api";

export function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    authApi.googleLogout();
  };

  const menuItems = [
    { name: "Feed", icon: Rss, isActive: true, onClick: () => navigate("/MainFeed"), path: "/MainFeed" },
    { name: "Settings", icon: Settings, isActive: false, onClick: () => navigate("/Settings"), path: "/Settings" },
    { name: "Log out", icon: LogOut, isActive: false, onClick: handleLogout, path: "/" },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside className="hidden w-64 flex-col p-4 md:flex">
      <h2 className="mb-4 text-sm font-semibold text-gray-500">Menu</h2>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            className={cn(
              "justify-start",
              isActive(item.path) && "bg-gray-200"
            )}
            onClick={item.onClick}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Button>
        ))}
      </nav>
    </aside>
  );
}
