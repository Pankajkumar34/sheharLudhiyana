import { UtensilsCrossed, ShoppingBag, Building2, Dumbbell, Scissors, GraduationCap, Home, Play } from "lucide-react";

const categories = [
  { name: "Food & Dining", count: "450+", icon: UtensilsCrossed, color: "bg-category-red" },
  { name: "Fashion & Shopping", count: "320+", icon: ShoppingBag, color: "bg-category-pink" },
  { name: "Healthcare", count: "180+", icon: Building2, color: "bg-category-green" },
  { name: "Fitness & Wellness", count: "95+", icon: Dumbbell, color: "bg-category-blue" },
  { name: "Beauty & Salon", count: "220+", icon: Scissors, color: "bg-category-purple" },
  { name: "Education", count: "140+", icon: GraduationCap, color: "bg-category-indigo" },
  { name: "Home Services", count: "160+", icon: Home, color: "bg-category-yellow" },
  { name: "Entertainment", count: "75+", icon: Play, color: "bg-category-orange" },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="text-3xl font-bold text-center text-foreground mb-2">
          Explore Categories
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Find exactly what you're looking for in Ludhiana
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-4`}>
                <cat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-muted-foreground">{cat.count} businesses</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
