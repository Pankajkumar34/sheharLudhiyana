import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar, MapPin, Users, User, Share2, Facebook, Twitter, LinkIcon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import eventFoodDetail from "@/assets/event-food-detail.jpg";
import eventGallery1 from "@/assets/event-food-gallery1.jpg";
import eventGallery2 from "@/assets/event-food-gallery2.jpg";
import eventCultural from "@/assets/event-cultural.jpg";
import eventWorkshop from "@/assets/event-workshop.jpg";
import eventStartup from "@/assets/event-startup.jpg";

const allEvents: Record<string, any> = {
  "ludhiana-food-festival-2024": {
    title: "Ludhiana Food Festival 2024",
    description: "A grand celebration of Punjabi cuisine featuring local restaurants, street food vendors, and cooking competitions.",
    category: "Food Events",
    price: "Free Entry",
    date: "2024-02-15",
    time: "10:00 AM - 8:00 PM",
    venue: "Punjab Agricultural University Grounds",
    venueAddress: "PAU Campus, Ferozepur Road, Ludhiana, Punjab 141004",
    organizer: "Ludhiana Food Association",
    organizerPhone: "+91 98765 43210",
    organizerEmail: "info@ludhianafoodassociation.com",
    attendees: 2500,
    capacity: 5000,
    image: eventFoodDetail,
    gallery: [eventGallery1, eventGallery2, eventCultural, eventWorkshop],
    about: "Join us for the biggest food festival in Ludhiana! Experience the authentic flavors of Punjab with over 50 food stalls, live cooking demonstrations by celebrity chefs, traditional Punjabi music performances, and exciting food competitions. This family-friendly event showcases the best of local cuisine, from street food favorites to gourmet delicacies. Don't miss the special kids zone, cultural performances, and amazing prizes!",
    highlights: [
      "50+ Food Stalls featuring authentic Punjabi cuisine",
      "Live Cooking Demonstrations by Celebrity Chefs",
      "Traditional Music & Dance Performances",
      "Food Eating Competitions with Cash Prizes",
      "Kids Zone with Fun Activities",
      "Free Parking Available",
    ],
    schedule: [
      { time: "10:00 AM", event: "Festival Opening & Welcome Speech" },
      { time: "11:00 AM", event: "Live Cooking Demo - Chef Ranveer Brar" },
      { time: "1:00 PM", event: "Punjabi Folk Dance Performance" },
      { time: "3:00 PM", event: "Food Eating Competition" },
      { time: "5:00 PM", event: "Live Music Performance" },
      { time: "7:00 PM", event: "Prize Distribution & Closing Ceremony" },
    ],
  },
  "digital-marketing-workshop": {
    title: "Digital Marketing Workshop for Small Businesses",
    description: "Learn essential digital marketing strategies to grow your business online.",
    category: "Business Events",
    price: "₹1,500",
    date: "2024-02-18",
    time: "9:00 AM - 5:00 PM",
    venue: "Hotel Park Plaza",
    venueAddress: "Ferozepur Road, Ludhiana, Punjab 141001",
    organizer: "Digital Punjab Academy",
    organizerPhone: "+91 98765 11111",
    organizerEmail: "info@digitalpunjab.com",
    attendees: 150,
    capacity: 200,
    image: eventWorkshop,
    gallery: [eventWorkshop, eventStartup, eventCultural, eventGallery1],
    about: "A comprehensive workshop covering social media marketing, SEO, Google Ads, and content marketing strategies tailored for small businesses in Ludhiana.",
    highlights: ["Hands-on SEO Training", "Social Media Strategy", "Google Ads Workshop", "Certificate of Completion"],
    schedule: [
      { time: "9:00 AM", event: "Registration & Networking" },
      { time: "10:00 AM", event: "SEO Fundamentals" },
      { time: "12:00 PM", event: "Lunch Break" },
      { time: "1:00 PM", event: "Social Media Marketing" },
      { time: "3:00 PM", event: "Google Ads Workshop" },
      { time: "4:30 PM", event: "Q&A and Closing" },
    ],
  },
};

const defaultEvent = allEvents["ludhiana-food-festival-2024"];

const EventDetail = () => {
  const { slug } = useParams();
  const event = allEvents[slug || ""] || defaultEvent;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative h-72 md:h-96">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="absolute bottom-6 left-0 container">
          <div className="flex gap-2 mb-3">
            <span className="bg-[hsl(270,60%,55%)] text-primary-foreground text-xs font-medium px-3 py-1 rounded-md">{event.category}</span>
            <span className="bg-destructive text-primary-foreground text-xs font-medium px-3 py-1 rounded-md">{event.price}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">{event.title}</h1>
          <p className="text-primary-foreground/80 mt-2 max-w-2xl">{event.description}</p>
        </div>
      </div>

      <div className="container py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main */}
          <div className="flex-1 space-y-8">
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">About This Event</h2>
              <p className="text-muted-foreground leading-relaxed">{event.about}</p>

              <h3 className="text-lg font-bold text-foreground mt-6 mb-3">Event Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {event.highlights.map((h: string) => (
                  <div key={h} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(270,60%,55%)] shrink-0 mt-0.5" /> {h}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Event Schedule</h2>
              <div className="space-y-4">
                {event.schedule.map((s: any) => (
                  <div key={s.time} className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-8 bg-[hsl(270,60%,55%)] rounded-full" />
                      <span className="text-primary font-semibold text-sm w-20">{s.time}</span>
                    </div>
                    <span className="text-foreground">{s.event}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Event Gallery</h2>
              <div className="grid grid-cols-2 gap-4">
                {event.gallery.map((img: string, i: number) => (
                  <img key={i} src={img} alt={`Gallery ${i + 1}`} className="w-full h-48 object-cover rounded-xl" loading="lazy" />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0 space-y-6">
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="text-lg font-bold text-foreground mb-3">{event.price}</h3>
              <Button className="w-full bg-[hsl(270,60%,55%)] hover:bg-[hsl(270,60%,45%)]">
                {event.price === "Free Entry" ? "Register for Free" : `Register - ${event.price}`}
              </Button>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Date & Time</p>
                    <p className="font-medium text-foreground">{event.date}</p>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Venue</p>
                    <p className="font-medium text-foreground">{event.venue}</p>
                    <p className="text-sm text-muted-foreground">{event.venueAddress}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Organizer</p>
                    <p className="font-medium text-foreground">{event.organizer}</p>
                    <p className="text-sm text-muted-foreground">{event.organizerPhone}</p>
                    <p className="text-sm text-muted-foreground">{event.organizerEmail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Attendees</p>
                    <p className="font-medium text-foreground">{event.attendees.toLocaleString()} registered</p>
                    <p className="text-sm text-muted-foreground">Capacity: {event.capacity.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold text-foreground mb-3">Share This Event</h3>
              <div className="flex gap-3">
                {[Facebook, Twitter, Share2, LinkIcon].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventDetail;
