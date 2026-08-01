import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Phone, MessageCircle, Mail, Globe, Share2, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import bizTextile from "@/assets/biz-textile.jpg";
import bizRestaurant from "@/assets/biz-restaurant.jpg";
import bizMall from "@/assets/biz-mall.jpg";
import bizHospital from "@/assets/biz-hospital.jpg";
import bizGym from "@/assets/biz-gym.jpg";
import { useGetBusinessByIdQuery } from "@/tanstack/business.tanstck";
import TestMap from "@/components/webComponents/TestMap";

const allBusinesses: Record<string, any> = {
  "oswal-woollen-mills": {
    name: "Oswal Woollen Mills",
    category: "Textile & Fabrics",
    rating: 4.7,
    reviews: 412,
    location: "Focal Point",
    address: "Plot No. 45-46, Focal Point, Ludhiana, Punjab 141010",
    isOpen: true,
    phone: "+91 161 2345678",
    whatsapp: "+91 98765 43210",
    email: "info@oswalwoollen.com",
    website: "www.oswalwoollen.com",
    image: bizTextile,
    gallery: [bizTextile, bizRestaurant, bizMall, bizHospital, bizGym, bizTextile],
    about: "Oswal Woollen Mills is a leading manufacturer of premium quality woollen textiles and fabrics. With over 40 years of experience in the textile industry, we specialize in producing high-quality woollen materials, blankets, and winter wear fabrics. Our state-of-the-art manufacturing facility ensures consistent quality and timely delivery for both domestic and international markets.",
    features: ["ISO 9001:2015 Certified", "Export Quality Products", "Bulk Orders Available", "Custom Fabric Design", "Quality Assurance", "Timely Delivery"],
    hours: [
      { day: "Monday", time: "09:00 - 18:00" },
      { day: "Tuesday", time: "09:00 - 18:00" },
      { day: "Wednesday", time: "09:00 - 18:00" },
      { day: "Thursday", time: "09:00 - 18:00" },
      { day: "Friday", time: "09:00 - 18:00" },
      { day: "Saturday", time: "09:00 - 14:00" },
      { day: "Sunday", time: "Closed" },
    ],
    products: [
      { name: "Premium Wool Blankets", price: "₹1,200 - ₹3,500", image: bizTextile },
      { name: "Winter Shawls Collection", price: "₹800 - ₹2,500", image: bizMall },
      { name: "Woollen Fabrics (per meter)", price: "₹350 - ₹1,200", image: bizRestaurant },
      { name: "Custom Order Textiles", price: "Contact for Price", image: bizHospital },
    ],
    reviewsList: [
      { name: "Rajesh Kumar", rating: 5, date: "2024-01-15", text: "Excellent quality wool products. Best in Ludhiana for textile manufacturing.", verified: true },
      { name: "Priya Sharma", rating: 4, date: "2024-01-10", text: "Good quality and reasonable prices. Bulk orders are handled very well.", verified: true },
      { name: "Vikram Singh", rating: 5, date: "2024-01-05", text: "Outstanding customer service and premium quality fabrics. Highly recommended!", verified: false },
    ],
  },
  "punjab-grill-restaurant": {
    name: "Punjab Grill Restaurant",
    category: "Fine Dining",
    rating: 4.8,
    reviews: 234,
    location: "Model Town",
    address: "SCO 15-16, Model Town, Ludhiana, Punjab 141002",
    isOpen: true,
    phone: "+91 161 4567890",
    whatsapp: "+91 98765 12345",
    email: "info@punjabgrill.com",
    website: "www.punjabgrill.com",
    image: bizRestaurant,
    gallery: [bizRestaurant, bizMall, bizGym, bizHospital, bizTextile, bizRestaurant],
    about: "Punjab Grill Restaurant offers an authentic Punjabi dining experience with a modern twist. Our chefs use traditional recipes passed down through generations, combined with the finest ingredients to create unforgettable culinary experiences.",
    features: ["Authentic Punjabi Cuisine", "Private Dining Available", "Catering Services", "Valet Parking", "Live Music Weekends", "AC Dining Hall"],
    hours: [
      { day: "Monday", time: "11:00 - 23:00" },
      { day: "Tuesday", time: "11:00 - 23:00" },
      { day: "Wednesday", time: "11:00 - 23:00" },
      { day: "Thursday", time: "11:00 - 23:00" },
      { day: "Friday", time: "11:00 - 00:00" },
      { day: "Saturday", time: "11:00 - 00:00" },
      { day: "Sunday", time: "12:00 - 22:00" },
    ],
    products: [
      { name: "Butter Chicken Special", price: "₹450", image: bizRestaurant },
      { name: "Tandoori Platter", price: "₹650", image: bizMall },
      { name: "Paneer Tikka", price: "₹350", image: bizGym },
      { name: "Biryani Special", price: "₹400", image: bizHospital },
    ],
    reviewsList: [
      { name: "Simran Kaur", rating: 5, date: "2024-02-01", text: "Best Punjabi food in Ludhiana! The butter chicken is to die for.", verified: true },
      { name: "Amit Patel", rating: 4, date: "2024-01-28", text: "Great ambiance and delicious food. Slightly pricey but worth it.", verified: true },
    ],
  },
};

const defaultBusiness = allBusinesses["oswal-woollen-mills"];
const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
});
const BusinessDetail = () => {
  const { slug } = useParams();

  const { data, isLoading } = useGetBusinessByIdQuery(slug)
  const businessY = data?.data;

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (businessY?.photos?.length) {
      setSelectedImage(0);
    }
  }, [businessY]);
  const business = allBusinesses[slug || ""] || defaultBusiness;
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = ["Overview", "Products", "Gallery", "Reviews"];
  console.log(businessY, "datadata")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-4">
        <Link to="/explore" className="text-primary font-medium flex items-center gap-1 text-sm hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Explore
        </Link>
      </div>

      <div className="container pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1">
            <div className="relative rounded-xl overflow-hidden h-72 md:h-[450px]">
              <img
                src={businessY?.photos?.[selectedImage]?.url}
                alt={businessY?.businessName}
                className="w-full h-full object-cover"
              />

              <span className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-lg text-sm">
                Verified
              </span>
            </div>
            {businessY?.photos?.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {businessY.photos.map((photo, index) => (
                  <button
                    key={photo._id}
                    onClick={() => setSelectedImage(index)}
                    className={`w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                      ? "border-blue-600"
                      : "border-gray-300 hover:border-blue-400"
                      }`}
                  >
                    <img
                      src={photo.url}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground"> {businessY?.businessName}</h1>
                  <p className="text-primary font-medium">{businessY?.category?.name}</p>
                </div>
                {business.isOpen && (
                  <span className="border border-primary text-primary text-sm font-medium px-3 py-1 rounded-lg">Open Now</span>
                )}
              </div>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(business.rating) ? "fill-primary text-primary" : "text-muted"}`} />
                  ))}
                </div>
                <span className="font-semibold text-foreground">{business.rating}</span>
                <span className="text-muted-foreground">({business.reviews} reviews)</span>
                <span className="text-muted-foreground flex items-center gap-1 ml-2">
                  <MapPin className="w-3.5 h-3.5" /> {businessY?.area}
                </span>
              </div>

              <div className="flex items-center gap-3 mt-5">
                <Button className="flex-1 gap-2 max-w-xs">
                  <Phone className="w-4 h-4" /> Call Now
                </Button>
                <Button className="flex-1 gap-2 max-w-xs bg-[hsl(142,71%,45%)] hover:bg-[hsl(142,71%,38%)]">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8 border-b border-border">
              <div className="flex gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`pb-3 text-sm font-medium transition-colors ${activeTab === tab.toLowerCase() ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="mt-6">
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-3">About</h2>
                  <p className="text-muted-foreground leading-relaxed"> {businessY?.description}</p>

                  <h2 className="text-xl font-bold text-foreground mt-8 mb-3">Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {business.features.map((f: string) => (
                      <div key={f} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {f}
                      </div>
                    ))}
                  </div>

                  <h2 className="text-xl font-bold text-foreground mt-8 mb-3">Opening Hours</h2>
                  <div className="space-y-0">
                    {businessY?.hours?.map((h) => (
                      <div
                        key={h._id}
                        className={`flex items-center justify-between py-3 border-b last:border-0 ${h.day === today ? "bg-blue-50 rounded-lg px-3" : ""
                          }`}
                      >
                        <span className="font-medium">
                          {h.day}
                          {h.day === today && (
                            <span className="ml-2 text-xs text-blue-600">(Today)</span>
                          )}
                        </span>

                        <span className={h.open ? "text-green-600" : "text-red-500"}>
                          {h.open ? `${h.from} - ${h.to}` : "Closed"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "products" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {business.products.map((p: any) => (
                    <div key={p.name} className="bg-card rounded-xl border border-border overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-40 object-cover" loading="lazy" />
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground">{p.name}</h3>
                        <p className="text-primary font-medium mt-1">{p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "gallery" && (
                <div className="grid grid-cols-2 gap-4">
                  {business.gallery.map((img: string, i: number) => (
                    <img key={i} src={img} alt={`Gallery ${i + 1}`} className="w-full h-48 object-cover rounded-xl" loading="lazy" />
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4">
                  {business.reviewsList.map((r: any, i: number) => (
                    <div key={i} className="bg-card rounded-xl border border-border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-semibold text-foreground">
                            {r.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground flex items-center gap-1">
                              {r.name}
                              {r.verified && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                            </p>
                            <p className="text-xs text-muted-foreground">{r.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className={`w-3.5 h-3.5 ${j < r.rating ? "fill-primary text-primary" : "text-muted"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground mt-3">{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0 space-y-6">
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold text-foreground mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">{businessY?.phone}</p>
                    <button className="text-xs text-primary">Copy</button>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[hsl(142,71%,45%)]/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 text-[hsl(142,71%,45%)]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">WhatsApp</p>
                    <p className="font-medium text-foreground">{businessY?.whatsapp}</p>
                    <button className="text-xs text-primary">Copy</button>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{businessY?.email}</p>
                    <button className="text-xs text-primary">Copy</button>
                  </div>
                </div>
                {/* <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Website</p>
                    <a href="#" className="font-medium text-primary">{business.website}</a>
                  </div>
                </div> */}
              </div>
            </div>
            {/* <TestMap /> */}
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold text-foreground mb-3">Location</h3>

              <div className="rounded-lg overflow-hidden border h-64">
                <iframe
                  title="Business Location"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${businessY?.location?.coordinates?.[1]},${businessY?.location?.coordinates?.[0]}&z=15&output=embed`}
                />
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                {businessY?.address}
              </p>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${businessY?.location?.coordinates?.[1]},${businessY?.location?.coordinates?.[0]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center gap-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg"
              >
                <MapPin className="w-4 h-4" />
                Open in Google Maps
              </a>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${businessY?.location?.coordinates?.[1]},${businessY?.location?.coordinates?.[0]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center gap-2 mt-3 border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </a>
            </div>

            <div className="bg-accent rounded-xl border border-border p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Write a Review</h3>
                  <p className="text-xs text-muted-foreground">Share your experience</p>
                </div>
              </div>
              <Button className="w-full">Leave a Review</Button>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BusinessDetail;
