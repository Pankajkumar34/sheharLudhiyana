import { Star, ArrowRight, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface BusinessCardProps {
  name: string;
  category: string;
  image: string;
  rating: number;
  reviewCount?: number;
  price: string;
  isOpen?: boolean;
  location?: string;
  hours?: string;
  variant?: "compact" | "detailed";
}

const BusinessCard = ({
  business,
  variant = "compact",
}: BusinessCardProps) => {
  const image =
    business?.photos?.[0]?.url || "/placeholder-business.jpg";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const todayHours = business?.hours?.find(
    (item: any) => item.day === today
  );

  const isOpen = todayHours?.open ?? false;

  const timing = isOpen
    ? `${todayHours?.from} - ${todayHours?.to}`
    : "Closed";

  if (variant === "detailed") {
    return (
      <Link to={`/business/${business?._id}`}>
        <div className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group">
          <div className="relative h-52 overflow-hidden">
            <img
              src={image}
              alt={business?.businessName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            <span
              className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-medium ${
                isOpen
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {isOpen ? "Open Now" : "Closed"}
            </span>
          </div>

          <div className="p-5">
            <h3 className="text-lg font-bold">
              {business?.businessName}
            </h3>

            <p className="text-muted-foreground">
              {business?.category?.name}
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {business?.area}
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              {timing}
            </div>

            <div className="mt-4 flex justify-end">
              <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/business/${business?._id}`}>
      <div className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group">
        <div className="relative h-44 overflow-hidden">
          <img
            src={image}
            alt={business?.businessName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <span
            className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-medium ${
              isOpen
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {isOpen ? "Open" : "Closed"}
          </span>

          <div className="absolute top-3 right-3 bg-black/60 text-white rounded-lg px-2 py-1 flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            4.8
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold line-clamp-1">
            {business?.businessName}
          </h3>

          <p className="text-sm text-muted-foreground">
            {business?.category?.name}
          </p>

          <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{business?.area}</span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-primary font-medium">
              {timing}
            </span>

            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BusinessCard;
