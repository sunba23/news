import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, CalendarDays } from "lucide-react";

// Define the props for our card
interface ArticleCardProps {
  title: string;
  description: string;
  tags: string[];
  publishedDate: string;
  gradient: string; // e.g., 'from-pink-500 to-purple-600'
}

export function ArticleCard({ title, description, tags, publishedDate, gradient }: ArticleCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">#{tag}</Badge>
          ))}
        </div>
        {/* Image Placeholder with Gradient */}
        <div className={`h-32 w-full rounded-lg bg-gradient-to-r ${gradient}`} />
      </CardContent>
      <CardFooter className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <span>{publishedDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}