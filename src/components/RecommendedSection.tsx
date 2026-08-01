import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import BusinessCard from "./BusinessCard";
import bizRestaurant from "@/assets/biz-restaurant.jpg";
import bizMall from "@/assets/biz-mall.jpg";
import bizGym from "@/assets/biz-gym.jpg";
import bizHospital from "@/assets/biz-hospital.jpg";
import { Link } from "react-router-dom";
const recommended = [
  { name: "Kulcha King Street Food", category: "Food & Dining", image: bizRestaurant, rating: 4.3, price: "₹" },
  { name: "Punjabi Tadka Restaurant", category: "Food & Dining", image: bizMall, rating: 4.5, price: "₹₹" },
  { name: "FitZone Premium Gym", category: "Fitness & Wellness", image: bizGym, rating: 4.6, price: "₹₹₹" },
  { name: "Fashion Forward Store", category: "Fashion & Shopping", image: bizHospital, rating: 4.1, price: "₹₹" },
];

const RecommendedSection = ({ businesses }: any) => {
  return (
    <section className="py-16 bg-section-warm">
      <div className="container">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">AI-Powered Recommendations</h2>
            <p className="text-sm text-muted-foreground">Discover businesses tailored just for you</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-foreground">Recommended for You</h3>
              <p className="text-sm text-muted-foreground">Personalized recommendations for you</p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="w-10 h-10 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-accent transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

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
      </div>
    </section>
  );
};

export default RecommendedSection;
