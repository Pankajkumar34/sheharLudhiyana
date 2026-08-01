import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import areaModelTown from "@/assets/area-model-town.jpg";
import areaSarabhaNagar from "@/assets/area-sarabha-nagar.jpg";
import areaDugri from "@/assets/area-dugri.jpg";
import areaFerozepurRoad from "@/assets/area-ferozepur-road.jpg";
import areaCivilLines from "@/assets/area-civil-lines.jpg";
import areaPauCampus from "@/assets/area-pau-campus.jpg";
import areaBrsNagar from "@/assets/area-brs-nagar.jpg";
import areaKidwaiNagar from "@/assets/area-kidwai-nagar.jpg";
import areaRajguruNagar from "@/assets/area-rajguru-nagar.jpg";
import areaPakhowalRoad from "@/assets/area-pakhowal-road.jpg";
import areaFocalPoint from "@/assets/area-focal-point.jpg";
import areaIndustrial from "@/assets/area-industrial.jpg";

const areas = [
  { name: "Model Town", slug: "model-town", image: areaModelTown, businesses: 245, description: "Premium residential area with upscale shopping and dining options", categories: ["Shopping", "Restaurants", "Healthcare"], highlights: ["Wave Mall", "Westend Mall", "Premium Restaurants"] },
  { name: "Sarabha Nagar", slug: "sarabha-nagar", image: areaSarabhaNagar, businesses: 189, description: "Bustling commercial hub with markets and business centers", categories: ["Shopping", "Electronics", "Textiles"], highlights: ["Main Market", "Electronics Hub", "Textile Shops"] },
  { name: "Dugri", slug: "dugri", image: areaDugri, businesses: 156, description: "Growing residential area with modern amenities and facilities", categories: ["Education", "Healthcare", "Fitness"], highlights: ["Schools", "Clinics", "Sports Facilities"] },
  { name: "Ferozepur Road", slug: "ferozepur-road", image: areaFerozepurRoad, businesses: 203, description: "Major arterial road with hotels, restaurants and commercial establishments", categories: ["Hotels", "Restaurants", "Automotive"], highlights: ["Luxury Hotels", "Fine Dining", "Car Showrooms"] },
  { name: "Civil Lines", slug: "civil-lines", image: areaCivilLines, businesses: 98, description: "Administrative and government area with offices and institutions", categories: ["Government", "Legal", "Banking"], highlights: ["District Courts", "Government Offices", "Banks"] },
  { name: "PAU Campus", slug: "pau-campus", image: areaPauCampus, businesses: 76, description: "Educational hub centered around Punjab Agricultural University", categories: ["Education", "Research", "Hostels"], highlights: ["University", "Research Centers", "Student Facilities"] },
  { name: "BRS Nagar", slug: "brs-nagar", image: areaBrsNagar, businesses: 134, description: "Established residential colony with local markets and services", categories: ["Local Services", "Grocery", "Healthcare"], highlights: ["Community Markets", "Local Shops", "Residential Areas"] },
  { name: "Kidwai Nagar", slug: "kidwai-nagar", image: areaKidwaiNagar, businesses: 89, description: "Peaceful residential area with parks and family-oriented businesses", categories: ["Parks", "Education", "Family Services"], highlights: ["Green Parks", "Schools", "Community Centers"] },
  { name: "Rajguru Nagar", slug: "rajguru-nagar", image: areaRajguruNagar, businesses: 67, description: "Developing area with new housing projects and emerging businesses", categories: ["Real Estate", "Construction", "New Businesses"], highlights: ["New Projects", "Modern Housing", "Growing Market"] },
  { name: "Pakhowal Road", slug: "pakhowal-road", image: areaPakhowalRoad, businesses: 187, description: "Commercial corridor with retail shops and service centers", categories: ["Retail", "Services", "Food"], highlights: ["Shopping Centers", "Service Hubs", "Restaurants"] },
  { name: "Focal Point", slug: "focal-point", image: areaFocalPoint, businesses: 234, description: "Major industrial hub with manufacturing and textile units", categories: ["Manufacturing", "Textiles", "Wholesale"], highlights: ["Hosiery Units", "Garment Factories", "Wholesale Markets"] },
  { name: "Industrial Area", slug: "industrial-area", image: areaIndustrial, businesses: 198, description: "Heavy industry zone with factories and large-scale manufacturing", categories: ["Industry", "Engineering", "Logistics"], highlights: ["Steel Plants", "Machine Tools", "Transport Hubs"] },
];

const Areas = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const filtered = areas.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));

  const handleSearch = () => {
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-muted py-12">
        <div className="container">
          <h1 className="text-3xl font-bold text-foreground mb-2">Explore Ludhiana Areas</h1>
          <p className="text-muted-foreground mb-8">Discover businesses, events, and services in different localities of Ludhiana</p>

          <div className="bg-background rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="flex-1 flex items-center gap-2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search areas, localities, landmarks..."
                className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button className="gap-2" onClick={handleSearch}>
              <Search className="w-4 h-4" /> Search Areas
            </Button>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <h2 className="text-2xl font-bold text-foreground mb-2">Popular Areas in Ludhiana</h2>
        <p className="text-muted-foreground mb-8">Click on any area to explore local businesses, events, and services</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((area) => (
            <Link to={`/areas/${area.slug}`} key={area.name} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer group block">
              <div className="relative h-48 overflow-hidden">
                <img src={area.image} alt={area.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-md">
                  {area.businesses} businesses
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground">{area.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{area.description}</p>

                <div className="mt-3">
                  <p className="text-sm font-semibold text-foreground mb-2">Popular Categories:</p>
                  <div className="flex flex-wrap gap-2">
                    {area.categories.map((cat) => (
                      <span key={cat} className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground">{cat}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-sm font-semibold text-foreground mb-2">Key Highlights:</p>
                  <ul className="space-y-1">
                    {area.highlights.map((h) => (
                      <li key={h} className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <span className="text-sm text-primary font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> View on Map
                  </span>
                  <Button size="sm">Explore Area</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Areas;
