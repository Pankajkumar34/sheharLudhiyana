import { useState } from "react";
import { Send, Eye, Bold, Italic, Underline, List, ListOrdered, Image, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const blogCategories = [
  "Food & Restaurants", "Business Tips", "Shopping Guide", "Travel & Tourism",
  "Healthcare", "Education", "Technology", "Lifestyle", "Events", "Local News",
];

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const seoScore = Math.min(100, Math.floor(
    (title.length > 10 ? 20 : 0) +
    (content.length > 200 ? 30 : content.length > 100 ? 15 : 0) +
    (category ? 15 : 0) +
    (metaDescription.length > 50 ? 20 : metaDescription.length > 20 ? 10 : 0) +
    (content.length > 500 ? 15 : 0)
  ));

  const getSeoColor = () => {
    if (seoScore >= 70) return "text-primary";
    if (seoScore >= 40) return "text-yellow-500";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-muted py-12">
        <div className="container">
          <h1 className="text-3xl font-bold text-foreground mb-2">Write & Earn</h1>
          <p className="text-muted-foreground mb-6">Create engaging content about Ludhiana and earn coins with our AI SEO assistant</p>

          <div className="bg-background rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Earn Coins for Quality Content</p>
              <p className="text-sm text-muted-foreground">SEO Score 70+ = 50 coins • Score 90+ = 70 coins (20 bonus!)</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8">
        <div className="flex gap-8">
          {/* Editor */}
          <main className="flex-1">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Write Your Blog</h2>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Eye className="w-4 h-4" /> Preview
                  </Button>
                  <Button className="gap-2">
                    <Send className="w-4 h-4" /> Publish
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground"
                  >
                    <option value="">Select category</option>
                    {blogCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Thumbnail</label>
                  <div className="border border-dashed border-border rounded-lg px-3 py-2 text-sm text-muted-foreground flex items-center gap-2 cursor-pointer hover:bg-muted transition-colors">
                    <Image className="w-4 h-4" /> Upload Image
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-1.5 block">Title</label>
                <input
                  type="text"
                  placeholder="Enter an engaging title for your blog post..."
                  className="w-full border border-border rounded-lg px-3 py-2.5 bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Content</label>
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/50">
                    <button className="p-1.5 rounded hover:bg-muted"><Bold className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded hover:bg-muted"><Italic className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded hover:bg-muted"><Underline className="w-4 h-4" /></button>
                    <div className="w-px h-5 bg-border mx-1" />
                    <button className="p-1.5 rounded hover:bg-muted"><List className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded hover:bg-muted"><ListOrdered className="w-4 h-4" /></button>
                  </div>
                  <textarea
                    placeholder="Write your amazing content here... Share insights about Ludhiana, business tips, or local experiences."
                    className="w-full p-4 min-h-[300px] bg-background text-foreground placeholder:text-muted-foreground outline-none resize-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </main>

          {/* SEO Sidebar */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="bg-card rounded-xl border border-border p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground">AI SEO Assistant</h3>
                <Bot className="w-5 h-5 text-muted-foreground" />
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div>
                  <p className="font-semibold text-foreground">SEO Score</p>
                  <p className="text-sm text-muted-foreground">{seoScore === 0 ? "Start writing..." : `${wordCount} words`}</p>
                </div>
                <div className="ml-auto relative w-16 h-16">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      strokeDasharray={`${seoScore}, 100`}
                    />
                  </svg>
                  <span className={`absolute inset-0 flex items-center justify-center text-lg font-bold ${getSeoColor()}`}>
                    {seoScore}
                  </span>
                </div>
              </div>

              <div className="bg-accent rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Meta Description</h4>
                <textarea
                  placeholder="Write a compelling meta description..."
                  className="w-full p-2 text-sm bg-background border border-border rounded-lg outline-none resize-none min-h-[80px] text-foreground placeholder:text-muted-foreground"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground mt-1">{metaDescription.length}/160 characters</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WriteBlog;
