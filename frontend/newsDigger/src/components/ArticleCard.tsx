import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ArticleCardProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  publishedDate: string;
  gradient: string;
}

export function ArticleCard({ id, title, description, tags, publishedDate, gradient }: ArticleCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/article/${id}`);
  };

  return (
    <Card className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow" onClick={handleCardClick}>
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
        <div className={`h-32 w-full rounded-lg bg-gradient-to-r ${gradient}`} />
      </CardContent>
      <CardFooter className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <span>{publishedDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}