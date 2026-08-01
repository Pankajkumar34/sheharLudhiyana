import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import RecommendedSection from "@/components/RecommendedSection";
import FeaturedBusinesses from "@/components/FeaturedBusinesses";
import Footer from "@/components/Footer";
import { useGetAllBusinesses } from "@/tanstack/business.tanstck";

const Index = () => {
const { data, isLoading, error } = useGetAllBusinesses();

console.log({
  data,
  isLoading,
  error,
});
const businesses = data?.data || [];
console.log(businesses,"businessesbusinesses")
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <RecommendedSection businesses={businesses}/>
      <FeaturedBusinesses businesses={businesses} />
      <Footer />
    </div>
  );
};

export default Index;
