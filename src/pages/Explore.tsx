import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Grid3X3, List, MapPin, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import bizRestaurant from "@/assets/biz-restaurant.jpg";
import bizMall from "@/assets/biz-mall.jpg";
import bizHospital from "@/assets/biz-hospital.jpg";
import bizGym from "@/assets/biz-gym.jpg";

const categories = [
  "All", "Hosiery & Garments", "Textile & Fabrics", "Food & Dining", "Fashion & Shopping",
  "Healthcare", "Education", "Fitness & Wellness", "Beauty & Salon",
  "Automotive", "Real Estate", "Professional Services", "Entertainment",
];

const areas = [
  "All", "Model Town", "Sarabha Nagar", "Dugri", "Ferozepur Road",
  "Civil Lines", "PAU Campus", "BRS Nagar", "Focal Point",
];

const ratings = ["All", "4.5+", "4.0+", "3.5+", "3.0+"];

const businesses = [
  { name: "Punjab Grill Restaurant", category: "Food & Dining", image: bizRestaurant, rating: 4.8, reviews: 234, price: "₹₹₹", location: "Model Town", distance: "2.1 km", isOpen: true, slug: "punjab-grill-restaurant" },
  { name: "Fashion Hub Mall", category: "Fashion & Shopping", image: bizMall, rating: 4.6, reviews: 189, price: "₹₹", location: "Sarabha Nagar", distance: "3.2 km", isOpen: true, slug: "fashion-hub-mall" },
  { name: "LifeCare Hospital", category: "Healthcare", image: bizHospital, rating: 4.9, reviews: 156, price: "₹₹₹₹", location: "Civil Lines", distance: "4.5 km", isOpen: true, slug: "lifecare-hospital" },
  { name: "Gold Gym Fitness", category: "Fitness & Wellness", image: bizGym, rating: 4.7, reviews: 98, price: "₹₹", location: "Dugri", distance: "1.8 km", isOpen: true, slug: "gold-gym-fitness" },
  { name: "Kulcha King", category: "Food & Dining", image: bizRestaurant, rating: 4.5, reviews: 412, price: "₹", location: "Ferozepur Road", distance: "0.8 km", isOpen: true, slug: "kulcha-king" },
  { name: "Oswal Woollen Mills", category: "Textile & Fabrics", image: bizMall, rating: 4.7, reviews: 623, price: "₹₹₹₹", location: "Focal Point", distance: "3.2 km", isOpen: true, slug: "oswal-woollen-mills" },
];

const Explore = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArea, setSelectedArea] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  const filtered = businesses.filter((biz) => {
    const matchCategory = selectedCategory === "All" || biz.category === selectedCategory;
    const matchArea = selectedArea === "All" || biz.location === selectedArea;
    const matchSearch = !search || biz.name.toLowerCase().includes(search.toLowerCase()) || biz.category.toLowerCase().includes(search.toLowerCase());
    const matchRating = selectedRating === "All" || biz.rating >= parseFloat(selectedRating.replace("+", ""));
    return matchCategory && matchArea && matchSearch && matchRating;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "reviews") return b.reviews - a.reviews;
    return 0;
  });

  const handleSearch = () => {
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-muted py-12">
        <div className="container">
          <h1 className="text-3xl font-bold text-foreground mb-2">Explore Ludhiana Businesses</h1>
          <p className="text-muted-foreground mb-8">Discover amazing local businesses in your area</p>

          <div className="bg-background rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="flex-1 flex items-center gap-2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search businesses, services, products..."
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
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <h3 className="font-bold text-foreground mb-4">Filters</h3>

            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <input type="radio" name="category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} className="accent-primary" />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <h4 className="font-semibold text-foreground mb-3">Area</h4>
              <div className="space-y-2">
                {areas.map((area) => (
                  <label key={area} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <input type="radio" name="area" checked={selectedArea === area} onChange={() => setSelectedArea(area)} className="accent-primary" />
                    {area}
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <h4 className="font-semibold text-foreground mb-3">Rating</h4>
              <div className="space-y-2">
                {ratings.map((r) => (
                  <label key={r} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <input type="radio" name="rating" checked={selectedRating === r} onChange={() => setSelectedRating(r)} className="accent-primary" />
                    {r === "All" ? "All Ratings" : `${r} & above`}
                  </label>
                ))}
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={() => { setSelectedCategory("All"); setSelectedArea("All"); setSelectedRating("All"); setSearch(""); }}>
              Clear All Filters
            </Button>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Results</h2>
                <p className="text-sm text-muted-foreground">Found {sorted.length} businesses</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex border border-border rounded-lg overflow-hidden">
                  <button onClick={() => setViewMode("grid")} className={`p-2 ${viewMode === "grid" ? "bg-muted" : "bg-background"}`}>
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode("list")} className={`p-2 ${viewMode === "list" ? "bg-muted" : "bg-background"}`}>
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground">
                  <option value="relevance">Sort by Relevance</option>
                  <option value="rating">Rating: High to Low</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>
            </div>

            {sorted.length === 0 ? (
              <div className="text-center py-16">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground">No businesses found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "space-y-4"}>
                {sorted.map((biz) => (
                  <Link to={`/business/${biz.slug}`} key={biz.name} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer group block">
                    <div className="relative h-48 overflow-hidden">
                      <img src={biz.image} alt={biz.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      {biz.isOpen && (
                        <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-md">Open Now</span>
                      )}
                      <div className="absolute top-3 right-3 bg-foreground/70 text-primary-foreground px-2 py-1 rounded-lg flex items-center gap-1 text-sm">
                        <Star className="w-3.5 h-3.5 fill-primary text-primary" /> {biz.rating}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground">{biz.name}</h3>
                      <p className="text-sm text-muted-foreground">{biz.category}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(biz.rating) ? "fill-primary text-primary" : "text-muted"}`} />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">({biz.reviews})</span>
                        <span className="text-sm text-muted-foreground ml-2">{biz.price}</span>
                      </div>
                      <div className="flex items-center justify-between mt-3 text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {biz.location} • {biz.distance}
                        </span>
                        <span className="text-primary font-medium">View Details</span>
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

export default Explore;
