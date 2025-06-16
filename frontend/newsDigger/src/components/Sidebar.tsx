import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Rss, Settings, LogOut } from "lucide-react";

export function Sidebar() {
  const menuItems = [
    { name: "Feed", icon: Rss, isActive: true },
    { name: "Settings", icon: Settings, isActive: false },
    { name: "Log out", icon: LogOut, isActive: false },
  ];

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
              item.isActive && "bg-gray-200"
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Button>
        ))}
      </nav>
    </aside>
  );
}