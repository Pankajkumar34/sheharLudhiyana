import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Calendar, MapPin, Users, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import eventFoodFestival from "@/assets/event-food-festival.jpg";
import eventWorkshop from "@/assets/event-workshop.jpg";
import eventCultural from "@/assets/event-cultural.jpg";
import eventStartup from "@/assets/event-startup.jpg";

const eventCategories = [
  "All", "Workshops", "Festivals", "Business Events", "Cultural Shows",
  "Food Events", "Sports", "Education", "Entertainment",
];

const events = [
  {
    title: "Ludhiana Food Festival 2024",
    description: "A grand celebration of Punjabi cuisine featuring local restaurants, street food vendors, and cooking competitions.",
    category: "Food Events",
    date: "2024-02-15 at 10:00 AM - 8:00 PM",
    venue: "Rakh Bagh Ground",
    attendees: 2500,
    price: "Free Entry",
    image: eventFoodFestival,
    organizer: "Ludhiana Food Association",
    slug: "ludhiana-food-festival-2024",
  },
  {
    title: "Digital Marketing Workshop for Small Businesses",
    description: "Learn essential digital marketing strategies to grow your business online. Covers social media, SEO, and online advertising.",
    category: "Business Events",
    date: "2024-02-18 at 9:00 AM - 5:00 PM",
    venue: "Hotel Park Plaza",
    attendees: 150,
    price: "₹1,500",
    image: eventWorkshop,
    organizer: "Digital Punjab Academy",
    slug: "digital-marketing-workshop",
  },
  {
    title: "Ludhiana Cultural Heritage Festival",
    description: "Celebrate the rich cultural heritage of Punjab with traditional dance, music, and art exhibitions.",
    category: "Cultural Shows",
    date: "2024-02-20 at 4:00 PM - 10:00 PM",
    venue: "Nehru Rose Garden",
    attendees: 1800,
    price: "₹200",
    image: eventCultural,
    organizer: "Ludhiana Cultural Society",
    slug: "ludhiana-food-festival-2024",
  },
  {
    title: "Startup Pitch Competition 2024",
    description: "Young entrepreneurs showcase their innovative business ideas to investors and mentors for funding opportunities.",
    category: "Business Events",
    date: "2024-02-25 at 2:00 PM - 7:00 PM",
    venue: "Ludhiana Management Association",
    attendees: 300,
    price: "₹500",
    image: eventStartup,
    organizer: "Punjab Startup Hub",
    slug: "digital-marketing-workshop",
  },
];

const Events = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false); // NEW: mobile filter drawer

  const filtered = events.filter((e) => {
    const matchCategory = selectedCategory === "All" || e.category === selectedCategory;
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleSearch = () => {
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedDate("");
    setSearch("");
  };

  const hasActiveFilters = selectedCategory !== "All" || selectedDate !== "" || search !== "";

  // Sidebar content — shared between desktop sidebar and mobile drawer
  const FilterContent = () => (
    <>
      <h3 className="font-bold text-foreground mb-4">Event Categories</h3>
      <div className="space-y-2">
        {eventCategories.map((cat) => (
          <label key={cat} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
            <input
              type="radio"
              name="event-cat"
              checked={selectedCategory === cat}
              onChange={() => setSelectedCategory(cat)}
              className="accent-[hsl(270,60%,55%)]"
            />
            {cat === "All" ? "All Categories" : cat}
          </label>
        ))}
      </div>

      <div className="border-t border-border mt-6 pt-4">
        <h4 className="font-semibold text-foreground mb-3">Date Range</h4>
        <div className="space-y-2">
          {["", "Today", "This Week", "This Month"].map((d) => (
            <label key={d || "all"} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
              <input
                type="radio"
                name="date-range"
                checked={selectedDate === d}
                onChange={() => setSelectedDate(d)}
                className="accent-[hsl(270,60%,55%)]"
              />
              {d || "All Dates"}
            </label>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full mt-6" onClick={clearFilters}>
        Clear Filters
      </Button>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero / Search */}
      <section className="bg-muted py-8 sm:py-12">
        <div className="container px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Ludhiana Events & Activities</h1>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
            Discover exciting events, workshops, and festivals happening in your city
          </p>

          {/* Search bar — stacks on mobile */}
          <div className="bg-background rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shadow-sm">
            <div className="flex-1 flex items-center gap-2">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search events, workshops, festivals..."
                className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              className="gap-2 bg-[hsl(270,60%,55%)] hover:bg-[hsl(270,60%,45%)] w-full sm:w-auto"
              onClick={handleSearch}
            >
              <Search className="w-4 h-4" />
              Search Events
            </Button>
          </div>
        </div>
      </section>

      <div className="container px-4 sm:px-6 py-6 sm:py-8">

        {/* Mobile: Filter toggle button */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <button
            onClick={() => setFiltersOpen((p) => !p)}
            className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm font-medium text-foreground bg-background hover:bg-muted transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={16} height={16}>
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[hsl(270,60%,55%)]" />
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
          </button>

          {hasActiveFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <X className="w-3 h-3" /> Clear filters
            </button>
          )}
        </div>

        {/* Mobile: Collapsible filter panel */}
        {filtersOpen && (
          <div className="lg:hidden bg-background border border-border rounded-xl p-4 mb-5">
            <FilterContent />
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FilterContent />
          </aside>

          <main className="flex-1 min-w-0">
            {/* Tabs + Sort — wraps on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div className="flex border border-border rounded-lg overflow-hidden w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 text-sm font-medium transition-colors ${activeTab === "upcoming" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 text-sm font-medium transition-colors ${activeTab === "past" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
                >
                  Past Events
                </button>
              </div>
              <select className="border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground w-full sm:w-auto">
                <option>Sort by Date</option>
                <option>Sort by Popularity</option>
                <option>Sort by Price</option>
              </select>
            </div>

            <p className="text-sm text-muted-foreground mb-4">Showing {filtered.length} events</p>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground">No events found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {filtered.map((event) => (
                  <Link
                    to={`/events/${event.slug}`}
                    key={event.title}
                    className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer group block"
                  >
                    <div className="relative h-44 sm:h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 bg-[hsl(270,60%,55%)] text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-md">
                        {event.category}
                      </span>
                      <span className="absolute top-3 right-3 bg-foreground/70 text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-md">
                        {event.price}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-foreground text-sm sm:text-base">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                      <div className="mt-3 space-y-1.5">
                        <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 shrink-0" /> {event.date}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 shrink-0" /> {event.venue}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 shrink-0" /> {event.attendees.toLocaleString()} attendees
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                        <span className="text-xs text-muted-foreground truncate mr-2">by {event.organizer}</span>
                        <span className="text-sm text-[hsl(270,60%,55%)] font-medium shrink-0">View Details →</span>
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

export default Events;