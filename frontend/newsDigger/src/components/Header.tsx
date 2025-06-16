import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h1 className="text-xl font-bold tracking-tight text-gray-900">
        NewsDigger
      </h1>
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
            {/* You can use an actual image here */}
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback className="bg-gray-200">
                <User className="h-4 w-4 text-gray-600"/>
            </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">dev</span>
      </div>
    </header>
  );
}
