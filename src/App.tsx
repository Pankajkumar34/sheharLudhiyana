import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Explore from "./pages/Explore.tsx";
import Areas from "./pages/Areas.tsx";
import AreaDetail from "./pages/AreaDetail.tsx";
import Blogs from "./pages/Blogs.tsx";
import BlogDetail from "./pages/BlogDetail.tsx";
import WriteBlog from "./pages/WriteBlog.tsx";
import Events from "./pages/Events.tsx";
import EventDetail from "./pages/EventDetail.tsx";
import BusinessDetail from "./pages/BusinessDetail.tsx";
import SearchResults from "./pages/SearchResults.tsx";
import NotFound from "./pages/NotFound.tsx";
import Dashboard from "./components/Dashboard.tsx";
import UserProfile from "./components/UserProfile.tsx";
import CampaignAnalytics from "./components/Campaignanalytics.tsx";
import ListYourBusiness from "./components/Listyourbusiness.tsx";
import SellProperty from "./components/SellProperty.tsx";
import BuyPropertiesPage from "./components/Buypropertiespage.tsx";
import RentPropertiesPage from "./components/Rentpropertiespage.tsx";
import PropertiesPage from "./components/PropertyPage.tsx";
import LoginPage from "./components/Login.tsx";
import Hospitals from "./components/Hospitals.tsx";
import AuthSuccess from "./components/authSuccess.tsx";
import CompleteProfileForm from "./components/webComponents/CompleteProfileForm.jsx"
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
  import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
    <ToastContainer/>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/areas" element={<Areas />} />
          <Route path="/areas/:slug" element={<AreaDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/write-blog" element={<WriteBlog />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/business/:slug" element={<BusinessDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/analytics" element={<CampaignAnalytics />} />
          <Route path="/list-your-business" element={<> <Navbar /><ListYourBusiness /><Footer /></>} />
          <Route path="/sell-your-property" element={<SellProperty />} />
          <Route path="/buy-property" element={<BuyPropertiesPage />} />
          <Route path="/rent-property" element={<RentPropertiesPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/auth-success" element={<AuthSuccess />} />
          <Route path="/complete-profile" element={<> <Navbar /><CompleteProfileForm /><Footer /></>} />






          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
