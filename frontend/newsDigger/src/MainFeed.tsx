import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ArticleCard } from "@/components/ArticleCard";

// Mock data for the article cards
const articles = [
  { id: 1, title: "Replace Windows, Not Your Device", description: "With the end of Windows 10 support, users are encouraged to...", tags: ["linux", "opensuse"], publishedDate: "Published December 2021", gradient: "from-pink-500 to-purple-600" },
  { id: 2, title: "The Rise of Serverless GPUs", description: "How cloud providers are changing the game for AI/ML workloads...", tags: ["serverless", "ai"], publishedDate: "Published January 2022", gradient: "from-blue-500 to-teal-400" },
  { id: 3, title: "A Deep Dive into Rust's Memory Safety", description: "Exploring the borrow checker and why it's a game-changer...", tags: ["rust", "systems"], publishedDate: "Published February 2022", gradient: "from-orange-500 to-yellow-400" },
  { id: 4, title: "Mastering React Server Components", description: "A look at the future of the React ecosystem and what it means...", tags: ["react", "webdev"], publishedDate: "Published March 2022", gradient: "from-sky-400 to-cyan-300" },
  { id: 5, title: "Is HTMX the Future of Web Dev?", description: "Challenging the SPA paradigm with a simpler, server-centric model...", tags: ["htmx", "go"], publishedDate: "Published April 2022", gradient: "from-green-400 to-lime-300" },
  { id: 6, title: "Optimizing Your CI/CD Pipeline", description: "Best practices for faster, more reliable deployments in 2022...", tags: ["devops", "ci-cd"], publishedDate: "Published May 2022", gradient: "from-indigo-500 to-violet-500" },
];

export default function FeedPage() {
  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6">
          {/* Responsive Grid for the articles */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map(article => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}