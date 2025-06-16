import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, CalendarDays, X } from "lucide-react";

// Define the props for the detailed article view
interface ArticleContentProps {
  title: string;
  tags: string[];
  fullText: string;
  publishedDate: string;
  gradient: string;
  sourceUrl: string;
}

export function ArticleContent({ title, tags, fullText, publishedDate, gradient, sourceUrl }: ArticleContentProps) {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex flex-row items-start justify-between">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">#{tag}</Badge>
          ))}
        </div>

        {/* Full Text */}
        <p className="text-base leading-relaxed text-gray-700">
            {fullText}
        </p>
        
        {/* Image Placeholder with Gradient */}
        <div className={`h-64 w-full rounded-lg bg-gradient-to-r ${gradient}`} />
      </CardContent>
      <CardFooter className="flex items-center justify-between text-sm text-gray-500">
        {/* Left Side: Date and Votes */}
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <span>{publishedDate}</span>
          <div className="ml-4 flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right Side: Link to Source */}
        <Button asChild variant="link">
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
            Link to source
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}