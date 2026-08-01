import { ArrowRight } from "lucide-react";
import BusinessCard from "./BusinessCard";
import bizRestaurant from "@/assets/biz-restaurant.jpg";
import bizMall from "@/assets/biz-mall.jpg";
import bizHospital from "@/assets/biz-hospital.jpg";
import bizGym from "@/assets/biz-gym.jpg";

const featured = [
  { name: "Punjab Grill Restaurant", category: "Fine Dining", image: bizRestaurant, rating: 4.8, reviewCount: 234, price: "₹₹₹", location: "Model Town, Ludhiana", hours: "Open until 11:00 PM" },
  { name: "Fashion Hub Mall", category: "Shopping", image: bizMall, rating: 4.6, reviewCount: 189, price: "₹₹", location: "Sarabha Nagar, Ludhiana", hours: "Open until 10:00 PM" },
  { name: "LifeCare Hospital", category: "Healthcare", image: bizHospital, rating: 4.9, reviewCount: 156, price: "₹₹₹", location: "Civil Lines, Ludhiana", hours: "24/7 Emergency" },
  { name: "Gold Gym Fitness", category: "Fitness", image: bizGym, rating: 4.7, reviewCount: 98, price: "₹₹", location: "Dugri, Ludhiana", hours: "Open until 10:00 PM" },
];

const FeaturedBusinesses = ({ businesses }: any) => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-bold text-foreground">Featured Businesses</h2>
          <a href="/explore" className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <p className="text-muted-foreground mb-8">Top-rated businesses in Ludhiana</p>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {businesses.map((businesss: any) => (
              <BusinessCard
                key={businesss._id}
                business={businesss}
                variant="compact"
              />
            ))}
          </div>
      </div>
    </section>
  );
};

export default FeaturedBusinesses;
