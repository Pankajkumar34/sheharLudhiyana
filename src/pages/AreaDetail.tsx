import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import areaModelTown from "@/assets/area-model-town.jpg";
import areaSarabhaNagar from "@/assets/area-sarabha-nagar.jpg";
import bizRestaurant from "@/assets/biz-restaurant.jpg";
import bizMall from "@/assets/biz-mall.jpg";
import bizHospital from "@/assets/biz-hospital.jpg";
import bizGym from "@/assets/biz-gym.jpg";

const areaData: Record<string, any> = {
  "model-town": {
    name: "Model Town",
    image: areaModelTown,
    description: "Premium residential area with upscale shopping and dining options. Model Town is one of the most sought-after localities in Ludhiana, known for its well-planned infrastructure, wide roads, and proximity to major commercial centers.",
    businesses: 245,
    highlights: ["Wave Mall", "Westend Mall", "Premium Restaurants", "Top Schools"],
    categories: ["Shopping", "Restaurants", "Healthcare", "Education"],
  },
  "sarabha-nagar": {
    name: "Sarabha Nagar",
    image: areaSarabhaNagar,
    description: "Bustling commercial hub with markets and business centers. Sarabha Nagar offers a mix of residential comfort and commercial opportunities.",
    businesses: 189,
    highlights: ["Main Market", "Electronics Hub", "Textile Shops"],
    categories: ["Shopping", "Electronics", "Textiles"],
  },
};

const sampleBusinesses = [
  { name: "Punjab Grill Restaurant", category: "Fine Dining", image: bizRestaurant, rating: 4.8, reviews: 234, slug: "punjab-grill-restaurant" },
  { name: "Fashion Hub Mall", category: "Shopping", image: bizMall, rating: 4.6, reviews: 189, slug: "fashion-hub-mall" },
  { name: "LifeCare Hospital", category: "Healthcare", image: bizHospital, rating: 4.9, reviews: 156, slug: "lifecare-hospital" },
  { name: "Gold Gym Fitness", category: "Fitness", image: bizGym, rating: 4.7, reviews: 98, slug: "gold-gym-fitness" },
];

const defaultArea = areaData["model-town"];

const AreaDetail = () => {
  const { slug } = useParams();
  const area = areaData[slug || ""] || defaultArea;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="relative h-64 md:h-80">
        <img src={area.image} alt={area.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <div className="absolute bottom-6 left-0 container">
          <Link to="/areas" className="text-primary-foreground/80 flex items-center gap-1 text-sm mb-2 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Areas
          </Link>
          <h1 className="text-3xl font-bold text-primary-foreground">{area.name}</h1>
          <p className="text-primary-foreground/80 mt-1">{area.businesses} businesses in this area</p>
        </div>
      </div>

      <div className="container py-10">
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-3">About {area.name}</h2>
          <p className="text-muted-foreground leading-relaxed">{area.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {area.categories.map((cat: string) => (
              <span key={cat} className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground">{cat}</span>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-6">Businesses in {area.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleBusinesses.map((biz) => (
            <Link to={`/business/${biz.slug}`} key={biz.name} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow group">
              <div className="relative h-44 overflow-hidden">
                <img src={biz.image} alt={biz.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <div className="absolute top-3 right-3 bg-foreground/70 text-primary-foreground px-2 py-1 rounded-lg flex items-center gap-1 text-sm">
                  <Star className="w-3.5 h-3.5 fill-primary text-primary" /> {biz.rating}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground">{biz.name}</h3>
                <p className="text-sm text-muted-foreground">{biz.category}</p>
                <p className="text-xs text-muted-foreground mt-2">{biz.reviews} reviews</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AreaDetail;
