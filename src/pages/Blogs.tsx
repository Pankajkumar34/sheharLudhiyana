import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import bizRestaurant from "@/assets/biz-restaurant.jpg";
import bizMall from "@/assets/biz-mall.jpg";
import bizHospital from "@/assets/biz-hospital.jpg";
import bizGym from "@/assets/biz-gym.jpg";

const categories = [
  "All Categories", "Business Tips", "Food & Restaurants", "Shopping Guide",
  "Travel & Tourism", "Healthcare", "Education", "Entertainment",
  "Real Estate", "Technology", "Lifestyle", "Events", "Local News",
];

const tags = ["#ludhiana", "#business", "#food", "#shopping", "#events", "#tips"];

const recommendedBlogs = [
  { title: "Best Street Food Places in Ludhiana You Must Try", category: "Food & Restaurants", author: "Priya Sharma", readTime: "5 min read", views: 2340, image: bizRestaurant, slug: "10-best-street-food-places-in-ludhiana" },
  { title: "Hidden Shopping Gems in Model Town Market", category: "Shopping Guide", author: "Anita Singh", readTime: "6 min read", views: 1523, image: bizMall, slug: "hidden-shopping-gems" },
  { title: "Healthcare Revolution Best Medical Facilities", category: "Healthcare", author: "Dr. Meera Patel", readTime: "9 min read", views: 2156, image: bizHospital, slug: "healthcare-revolution" },
  { title: "Weekend Getaways Near Ludhiana Perfect Trips", category: "Travel & Tourism", author: "Simran Kaur", readTime: "4 min read", views: 1234, image: bizGym, slug: "weekend-getaways" },
];

const articles = [
  { title: "10 Best Street Food Places in Ludhiana You Must Try", excerpt: "From famous kulchas to delicious parathas, discover the ultimate street food guide for Ludhiana food lovers.", author: "Priya Sharma", date: "2024-01-15", readTime: "5 min read", views: 2340, image: bizRestaurant, category: "Food & Restaurants", featured: true, slug: "10-best-street-food-places-in-ludhiana" },
  { title: "Starting Your Business in Ludhiana: Complete Guide 2024", excerpt: "Everything you need to know about starting and growing your business in Ludhiana, from registration to marketing.", author: "Rajesh Kumar", date: "2024-01-12", readTime: "8 min read", views: 1876, image: bizGym, category: "Business Tips", featured: false, slug: "starting-your-business-in-ludhiana" },
  { title: "Hidden Shopping Gems in Model Town Market", excerpt: "Discover the best hidden shopping spots in Model Town, from boutiques to wholesale markets.", author: "Anita Singh", date: "2024-01-10", readTime: "6 min read", views: 1523, image: bizMall, category: "Shopping Guide", featured: false, slug: "hidden-shopping-gems" },
  { title: "Ludhiana's Growing Tech Scene: Opportunities for Young Professionals", excerpt: "Explore the rapidly expanding technology ecosystem in Ludhiana and career opportunities.", author: "Vikram Mehta", date: "2024-01-08", readTime: "7 min read", views: 1102, image: bizHospital, category: "Technology", featured: false, slug: "tech-scene-ludhiana" },
];

const Blogs = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Latest");
  const [search, setSearch] = useState("");

  const filteredArticles = articles.filter((a) => {
    const matchCategory = selectedCategory === "All Categories" || a.category === selectedCategory;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleSearch = () => {
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-muted py-12">
        <div className="container">
          <h1 className="text-3xl font-bold text-foreground mb-2">Ludhiana Blogs & Stories</h1>
          <p className="text-muted-foreground mb-8">Discover local insights, business tips, and community stories</p>

          <div className="bg-background rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="flex-1 flex items-center gap-2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search blogs, topics, authors..."
                className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button className="gap-2" onClick={handleSearch}>
              <Search className="w-4 h-4" /> Search
            </Button>
          </div>
        </div>
      </section>

      {/* Recommended Blogs */}
      <div className="container py-12">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Recommended Blogs for You</h2>
            <p className="text-sm text-muted-foreground">Personalized recommendations for you</p>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {recommendedBlogs.map((blog) => (
            <Link to={`/blog/${blog.slug}`} key={blog.title} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer group block">
              <div className="relative h-40 overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-md">{blog.category}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-sm line-clamp-2">{blog.title}</h3>
                <p className="text-xs text-muted-foreground mt-2">By {blog.author} • {blog.readTime}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">{blog.views.toLocaleString()} views</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Articles with sidebar */}
      <div className="container pb-16">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <h3 className="font-bold text-foreground mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <input type="radio" name="blog-category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} className="accent-primary" />
                  {cat}
                </label>
              ))}
            </div>

            <div className="border-t border-border mt-6 pt-4">
              <h4 className="font-semibold text-foreground mb-3">Popular Tags</h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:bg-muted cursor-pointer">{tag}</span>
                ))}
              </div>
            </div>

            <Button variant="outline" className="w-full mt-6" onClick={() => { setSelectedCategory("All Categories"); setSearch(""); }}>Clear Filters</Button>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Latest Articles</h2>
                <p className="text-sm text-muted-foreground">{filteredArticles.length} articles</p>
              </div>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground">
                <option>Latest</option>
                <option>Most Popular</option>
                <option>Most Viewed</option>
              </select>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground">No articles found</h3>
                <p className="text-muted-foreground mt-1">Try a different category or search term</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <Link to={`/blog/${article.slug}`} key={article.title} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer group block">
                    <div className="relative h-48 overflow-hidden">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      {article.featured && (
                        <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-md">Featured</span>
                      )}
                      <span className="absolute top-3 right-3 bg-primary/80 text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-md">{article.category}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-foreground">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-semibold text-foreground text-sm">{article.author.charAt(0)}</div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{article.author}</p>
                          <p className="text-xs text-muted-foreground">{article.date} • {article.readTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                        <span className="text-sm text-muted-foreground flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {article.views.toLocaleString()} views</span>
                        <span className="text-sm text-primary font-medium flex items-center gap-1">Read More <ArrowRight className="w-3.5 h-3.5" /></span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blogs;
