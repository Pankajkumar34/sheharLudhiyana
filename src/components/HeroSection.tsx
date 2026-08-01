import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ludhiana.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <section className="relative h-[500px] sm:h-[550px] md:h-[600px] flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Ludhiana cityscape at sunset"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={800}
      />
      <div className="absolute inset-0 bg-foreground/50" />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-primary-foreground mb-2 leading-tight">
          Discover Ludhiana's
        </h1>
        <p className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-primary mb-3 md:mb-4 leading-tight">
          Best Places
        </p>
        <p className="text-sm sm:text-base md:text-lg text-primary-foreground/90 mb-6 md:mb-8 px-2">
          Your local guide to restaurants, shops, services, and events in the Manchester of India
        </p>

        {/* Search bar */}
        <div className="bg-background rounded-full flex items-center p-1.5 sm:p-2 max-w-2xl mx-auto shadow-xl">
          <input
            type="text"
            placeholder="Search restaurants, shops, services..."
            className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm sm:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button className="rounded-full px-4 sm:px-6 gap-1.5 sm:gap-2 text-sm sm:text-base" onClick={handleSearch}>
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Search</span>
            <span className="sm:hidden">Go</span>
          </Button>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-5 md:mt-6 px-4 sm:px-0">
          <Button
            size="lg"
            className="w-full sm:w-auto text-sm sm:text-base"
            onClick={() => navigate("/explore")}
          >
            List Your Business Free
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto text-sm sm:text-base bg-background/20 border-primary-foreground/30 text-primary-foreground hover:bg-background/30"
            onClick={() => navigate("/explore")}
          >
            Explore Businesses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;