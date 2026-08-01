import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Star, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import bizRestaurant from "@/assets/biz-restaurant.jpg";
import bizMall from "@/assets/biz-mall.jpg";
import bizHospital from "@/assets/biz-hospital.jpg";
import bizGym from "@/assets/biz-gym.jpg";

const allResults = {
  businesses: [
    { name: "Punjab Grill Restaurant", category: "Fine Dining", image: bizRestaurant, rating: 4.8, location: "Model Town", slug: "punjab-grill-restaurant" },
    { name: "Kulcha King", category: "Street Food", image: bizRestaurant, rating: 4.5, location: "Ferozepur Road", slug: "kulcha-king" },
    { name: "Fashion Hub Mall", category: "Shopping", image: bizMall, rating: 4.6, location: "Sarabha Nagar", slug: "fashion-hub-mall" },
    { name: "LifeCare Hospital", category: "Healthcare", image: bizHospital, rating: 4.9, location: "Civil Lines", slug: "lifecare-hospital" },
    { name: "Gold Gym Fitness", category: "Fitness", image: bizGym, rating: 4.7, location: "Dugri", slug: "gold-gym-fitness" },
    { name: "Oswal Woollen Mills", category: "Textile & Fabrics", image: bizMall, rating: 4.7, location: "Focal Point", slug: "oswal-woollen-mills" },
  ],
  events: [
    { title: "Ludhiana Food Festival 2024", category: "Food Events", date: "Feb 15, 2024", image: bizRestaurant, slug: "ludhiana-food-festival-2024" },
    { title: "Digital Marketing Workshop", category: "Business Events", date: "Feb 18, 2024", image: bizGym, slug: "digital-marketing-workshop" },
  ],
  blogs: [
    { title: "10 Best Street Food Places in Ludhiana", category: "Food & Restaurants", author: "Priya Sharma", image: bizRestaurant, slug: "10-best-street-food-places-in-ludhiana" },
    { title: "Starting Your Business in Ludhiana", category: "Business Tips", author: "Rajesh Kumar", image: bizGym, slug: "starting-your-business-in-ludhiana" },
  ],
};

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [search, setSearch] = useState(query);
  const [activeTab, setActiveTab] = useState("all");

  const q = query.toLowerCase();
  const filteredBiz = allResults.businesses.filter(b => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q) || b.location.toLowerCase().includes(q));
  const filteredEvents = allResults.events.filter(e => e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q));
  const filteredBlogs = allResults.blogs.filter(b => b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q));
  const totalResults = filteredBiz.length + filteredEvents.length + filteredBlogs.length;

  const handleSearch = () => {
    setSearchParams({ q: search });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-muted py-10">
        <div className="container">
          <h1 className="text-2xl font-bold text-foreground mb-4">Search Results {query && `for "${query}"`}</h1>
          <div className="bg-background rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="flex-1 flex items-center gap-2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search businesses, events, blogs..."
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

      <div className="container py-8">
        <div className="flex gap-4 mb-6 border-b border-border">
          {[
            { key: "all", label: `All (${totalResults})` },
            { key: "businesses", label: `Businesses (${filteredBiz.length})` },
            { key: "events", label: `Events (${filteredEvents.length})` },
            { key: "blogs", label: `Blogs (${filteredBlogs.length})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 px-2 text-sm font-medium ${activeTab === tab.key ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {(activeTab === "all" || activeTab === "businesses") && filteredBiz.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">Businesses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredBiz.map((biz) => (
                <Link to={`/business/${biz.slug}`} key={biz.name} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow group">
                  <div className="relative h-40 overflow-hidden">
                    <img src={biz.image} alt={biz.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    <div className="absolute top-3 right-3 bg-foreground/70 text-primary-foreground px-2 py-1 rounded-lg flex items-center gap-1 text-sm">
                      <Star className="w-3.5 h-3.5 fill-primary text-primary" /> {biz.rating}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{biz.name}</h3>
                    <p className="text-sm text-muted-foreground">{biz.category}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> {biz.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {(activeTab === "all" || activeTab === "events") && filteredEvents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEvents.map((event) => (
                <Link to={`/events/${event.slug}`} key={event.title} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow group flex">
                  <img src={event.image} alt={event.title} className="w-32 h-full object-cover shrink-0" loading="lazy" />
                  <div className="p-4">
                    <span className="text-xs px-2 py-0.5 rounded bg-[hsl(270,60%,55%)] text-primary-foreground">{event.category}</span>
                    <h3 className="font-semibold text-foreground mt-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {event.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {(activeTab === "all" || activeTab === "blogs") && filteredBlogs.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBlogs.map((blog) => (
                <Link to={`/blog/${blog.slug}`} key={blog.title} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow group flex">
                  <img src={blog.image} alt={blog.title} className="w-32 h-full object-cover shrink-0" loading="lazy" />
                  <div className="p-4">
                    <span className="text-xs px-2 py-0.5 rounded bg-primary text-primary-foreground">{blog.category}</span>
                    <h3 className="font-semibold text-foreground mt-2">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">By {blog.author}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {totalResults === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground">No results found</h2>
            <p className="text-muted-foreground mt-2">Try searching with different keywords</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;
