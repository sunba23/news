import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ArticleContent } from "@/components/ArticleContent";

// Mock data for a single article
const articleData = {
  title: "Replace Windows, Not Your Device",
  tags: ["linux", "opensuse"],
  fullText: "With the end of Windows 10 support, users are encouraged to consider open-source alternatives like openSUSE instead of discarding functional hardware. Using Linux distributions can extend the life of devices, reduce electronic waste, and offer greater control over privacy and security without the need for new hardware.",
  publishedDate: "Published December 2021",
  gradient: "from-pink-500 to-purple-600",
  sourceUrl: "#" // Replace with a real URL
};

export default function ArticlePage() {
  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center p-6">
          <ArticleContent {...articleData} />
        </main>
      </div>
    </div>
  );
}