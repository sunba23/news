// src/pages/OnboardingForm.tsx

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";

// Define our topics data
const ALL_TOPICS = [
  { id: "react", label: "React" },
  { id: "vue", label: "Vue.js" },
  { id: "node", label: "Node.js" },
  { id: "ai-ml", label: "AI/ML" },
  { id: "rust", label: "Rust" },
  { id: "go", label: "Go" },
  { id: "devops", label: "DevOps" },
];

export default function OnboardingForm() {
  // State to hold the IDs of the selected topics
  const [selectedTopics, setSelectedTopics] = React.useState<string[]>([]);
  const navigate = useNavigate();

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Selected Topics:", selectedTopics);
    navigate('/MainFeed');
  };

  // Function to handle toggling a topic
  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics((prevSelected) =>
      prevSelected.includes(topicId)
        ? prevSelected.filter((id) => id !== topicId) // Remove topic
        : [...prevSelected, topicId] // Add topic
    );
  };

  // Get the labels of the selected topics for display
  const selectedTopicLabels = ALL_TOPICS
    .filter(topic => selectedTopics.includes(topic.id))
    .map(topic => topic.label);

  return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-gray-500 font-normal">Tell us more about yourself</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid w-full items-start gap-8">
              
              {/* Username Field */}
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" defaultValue="dev" />
                <p className="text-sm text-gray-500">Enter your username</p>
              </div>

              {/* === MODIFIED TOPICS FIELD === */}
              <div className="grid gap-2">
                <Label>Topics</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start font-normal">
                      {selectedTopicLabels.length > 0
                        ? selectedTopicLabels.join(", ")
                        : "Select topics"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search topics..." />
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                          {ALL_TOPICS.map((topic) => (
                            <CommandItem
                              key={topic.id}
                              value={topic.label} // Value for searching
                              onSelect={() => handleTopicToggle(topic.id)}
                            >
                              <Checkbox
                                className="mr-2"
                                checked={selectedTopics.includes(topic.id)}
                                onCheckedChange={() => handleTopicToggle(topic.id)}
                                id={`topic-${topic.id}`}
                              />
                              <Label htmlFor={`topic-${topic.id}`} className="font-normal">
                                {topic.label}
                              </Label>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <p className="text-sm text-gray-500">Select topics that interest you</p>
              </div>

              {/* Language Field */}
              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Select>
                  <SelectTrigger id="language"><SelectValue placeholder="Select language" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">Select the preferred language of the content</p>
              </div>

              {/* Job Role Field */}
              <div className="grid gap-2">
                <Label htmlFor="job-role">Job Role</Label>
                <Select>
                  <SelectTrigger id="job-role"><SelectValue placeholder="Select job role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend Developer</SelectItem>
                    <SelectItem value="backend">Backend Developer</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">Select your job role</p>
              </div>

              {/* Newsletter Field */}
              <div className="grid gap-3">
                <Label>Newsletter</Label>
                <RadioGroup defaultValue="monthly" className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily" className="font-normal">Daily</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly" className="font-normal">Weekly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="font-normal">Mouthly</Label>
                  </div>
                </RadioGroup>
                <p className="text-sm text-gray-500">Select how frequent do you want to get the updates</p>
              </div>

            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={handleFormSubmit} className="w-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white">
              Save & Go to Feed
            </Button>
          </CardFooter>
        </Card>
  );
}