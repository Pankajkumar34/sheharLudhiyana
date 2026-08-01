import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// ─── Types ────────────────────────────────────────────────────────────────────
type PropertyType = "buy" | "sell" | "rent" | "all";
type PropertyCategory = "residential" | "commercial" | "all";
type ViewMode = "grid" | "map";

interface Property {
  id: number;
  title: string;
  location: string;
  area: string;
  price: string;
  type: "buy" | "sell" | "rent";
  category: "residential" | "commercial";
  beds?: number;
  baths?: number;
  sqft: number;
  tag?: string;
  image: string;
  postedBy: string;
  phone: string;
  lat: number;
  lng: number;
}

// ─── Ludhiana Areas ───────────────────────────────────────────────────────────
const LUDHIANA_AREAS = [
  "All Areas","Model Town","BRS Nagar","Sarabha Nagar","Civil Lines",
  "Dugri","Pakhowal Road","Ferozepur Road","Haibowal",
  "Gurdev Nagar","Urban Estate","Sector 32","Kitchlu Nagar",
];

// ─── Properties Data (real Unsplash images + Ludhiana coords) ────────────────
const ALL_PROPERTIES: Property[] = [
  {
    id:1, title:"3BHK Spacious Flat", location:"Model Town, Ludhiana", area:"Model Town",
    price:"₹85 Lakh", type:"buy", category:"residential", beds:3, baths:2, sqft:1450, tag:"Featured",
    image:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    postedBy:"Rajesh Sharma", phone:"98765 43210", lat:30.9010, lng:75.8573,
  },
  {
    id:2, title:"2BHK Ready to Move", location:"BRS Nagar, Ludhiana", area:"BRS Nagar",
    price:"₹55 Lakh", type:"buy", category:"residential", beds:2, baths:2, sqft:1100, tag:"New",
    image:"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    postedBy:"Simran Kaur", phone:"98123 45678", lat:30.8968, lng:75.8475,
  },
  {
    id:3, title:"Commercial Shop Space", location:"Ferozepur Road, Ludhiana", area:"Ferozepur Road",
    price:"₹1.2 Cr", type:"buy", category:"commercial", sqft:800, tag:"Hot Deal",
    image:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    postedBy:"Amrit Traders", phone:"99887 76655", lat:30.8800, lng:75.8200,
  },
  {
    id:4, title:"4BHK Villa with Garden", location:"Sarabha Nagar, Ludhiana", area:"Sarabha Nagar",
    price:"₹2.5 Cr", type:"sell", category:"residential", beds:4, baths:3, sqft:3200, tag:"Luxury",
    image:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    postedBy:"Harpreet Singh", phone:"98765 01234", lat:30.9050, lng:75.8650,
  },
  {
    id:5, title:"Office Space 2nd Floor", location:"Civil Lines, Ludhiana", area:"Civil Lines",
    price:"₹95 Lakh", type:"sell", category:"commercial", sqft:1200,
    image:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
    postedBy:"City Builders", phone:"98554 43322", lat:30.9120, lng:75.8530,
  },
  {
    id:6, title:"Independent House 3BHK", location:"Dugri, Ludhiana", area:"Dugri",
    price:"₹1.1 Cr", type:"sell", category:"residential", beds:3, baths:3, sqft:2100, tag:"Corner Plot",
    image:"https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    postedBy:"Gurpreet Realty", phone:"97998 87766", lat:30.8850, lng:75.8390,
  },
  {
    id:7, title:"2BHK Furnished Flat", location:"Pakhowal Road, Ludhiana", area:"Pakhowal Road",
    price:"₹18,000/mo", type:"rent", category:"residential", beds:2, baths:1, sqft:950, tag:"Furnished",
    image:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    postedBy:"Navdeep Arora", phone:"98776 65544", lat:30.8920, lng:75.8700,
  },
  {
    id:8, title:"1BHK Near Bus Stand", location:"Sector 32, Ludhiana", area:"Sector 32",
    price:"₹9,500/mo", type:"rent", category:"residential", beds:1, baths:1, sqft:550, tag:"Budget",
    image:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
    postedBy:"Kiran Properties", phone:"99112 23344", lat:30.8750, lng:75.8600,
  },
  {
    id:9, title:"Showroom Ground Floor", location:"Gurdev Nagar, Ludhiana", area:"Gurdev Nagar",
    price:"₹45,000/mo", type:"rent", category:"commercial", sqft:1800, tag:"Prime Location",
    image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    postedBy:"Metro Realtors", phone:"98761 12233", lat:30.9080, lng:75.8420,
  },
  {
    id:10, title:"3BHK Semi-Furnished", location:"Haibowal, Ludhiana", area:"Haibowal",
    price:"₹65 Lakh", type:"buy", category:"residential", beds:3, baths:2, sqft:1350,
    image:"https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80",
    postedBy:"Lal Chand Estate", phone:"98556 67788", lat:30.8680, lng:75.8350,
  },
  {
    id:11, title:"Warehouse / Godown", location:"Urban Estate, Ludhiana", area:"Urban Estate",
    price:"₹28,000/mo", type:"rent", category:"commercial", sqft:5000,
    image:"https://images.unsplash.com/photo-1553267751-1c148a7280a1?w=600&q=80",
    postedBy:"Industrial Hub", phone:"99001 12244", lat:30.8820, lng:75.8800,
  },
  {
    id:12, title:"5BHK Bungalow", location:"Urban Estate, Ludhiana", area:"Urban Estate",
    price:"₹3.8 Cr", type:"sell", category:"residential", beds:5, baths:4, sqft:4200, tag:"Premium",
    image:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    postedBy:"Sona Real Estate", phone:"98765 44321", lat:30.8780, lng:75.8830,
  },
];

// ─── Map View Component (Leaflet via CDN) ─────────────────────────────────────
const MapView = ({ properties }: { properties: Property[] }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Load Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const initMap = () => {
      if (!(window as any).L || mapInstanceRef.current) return;
      const L = (window as any).L;

      const map = L.map(mapRef.current!, { zoomControl: true, scrollWheelZoom: false });
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      map.setView([30.9010, 75.8573], 13);

      const typeColor: Record<string, string> = { buy: "#1D9E75", sell: "#D85A30", rent: "#185FA5" };

      properties.forEach((p) => {
        const icon = L.divIcon({
          className: "",
          html: `<div style="
            background:${typeColor[p.type]};
            color:#fff;font-size:11px;font-weight:700;
            padding:4px 8px;border-radius:20px;white-space:nowrap;
            box-shadow:0 2px 8px rgba(0,0,0,0.25);
            border:2px solid #fff;
          ">${p.price}</div>`,
          iconAnchor: [0, 0],
        });

        L.marker([p.lat, p.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family:system-ui;min-width:180px">
              <img src="${p.image}" style="width:100%;height:100px;object-fit:cover;border-radius:6px;margin-bottom:8px"/>
              <strong style="font-size:13px">${p.title}</strong><br/>
              <span style="font-size:11px;color:#888">${p.location}</span><br/>
              <span style="font-size:14px;font-weight:700;color:#D85A30">${p.price}</span>
            </div>
          `);
      });
    };

    if ((window as any).L) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when properties change
  useEffect(() => {
    if (!mapInstanceRef.current || !(window as any).L) return;
    // re-init handled by parent remount key
  }, [properties]);

  return (
    <div ref={mapRef} style={{ width: "100%", height: "560px", borderRadius: "16px", overflow: "hidden", border: "1px solid #e5e7eb" }} />
  );
};

// ─── Property Card ─────────────────────────────────────────────────────────────
const PropertyCard = ({ property, index }: { property: Property; index: number }) => {
  const [showPhone, setShowPhone] = useState(false);
  const [imgError, setImgError] = useState(false);

  const typeConfig: Record<string, { label: string; bg: string; text: string }> = {
    buy:  { label: "For Sale", bg: "#dcfdf1", text: "#0f6e56" },
    sell: { label: "Selling",  bg: "#fef3ee", text: "#993c1d" },
    rent: { label: "For Rent", bg: "#e6f1fb", text: "#0c447c" },
  };
  const tc = typeConfig[property.type];

  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      overflow: "hidden",
      border: "1px solid #f0efe8",
      transition: "box-shadow 0.22s, transform 0.22s",
      animationDelay: `${index * 60}ms`,
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "196px", overflow: "hidden", background: "#f5f5f0" }}>
        {!imgError ? (
          <img
            src={property.image}
            alt={property.title}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0ede8" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
        )}

        {/* Badges */}
        <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "6px" }}>
          <span style={{ background: tc.bg, color: tc.text, fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px" }}>
            {tc.label}
          </span>
          {property.tag && (
            <span style={{ background: "rgba(255,255,255,0.95)", color: "#444", fontSize: "10px", fontWeight: 600, padding: "3px 9px", borderRadius: "20px", border: "1px solid #eee" }}>
              {property.tag}
            </span>
          )}
        </div>

        {/* Category pill */}
        <span style={{
          position: "absolute", bottom: "10px", right: "12px",
          background: "rgba(0,0,0,0.55)", color: "#fff",
          fontSize: "10px", padding: "3px 9px", borderRadius: "12px",
          textTransform: "capitalize", backdropFilter: "blur(4px)",
        }}>
          {property.category}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "15px 16px 16px" }}>
        <p style={{ fontSize: "15px", fontWeight: 700, color: "#111", margin: "0 0 4px", lineHeight: 1.3 }}>
          {property.title}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#999", fontSize: "12px", marginBottom: "10px" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {property.location}
        </div>

        {/* Specs row */}
        <div style={{ display: "flex", gap: "12px", color: "#666", fontSize: "12px", marginBottom: "13px", flexWrap: "wrap" }}>
          {property.beds && (
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8"/><path d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/>
              </svg>
              {property.beds} Beds
            </span>
          )}
          {property.baths && (
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12h20v2a6 6 0 01-6 6H8a6 6 0 01-6-6v-2z"/><path d="M5 12V5a2 2 0 014 0"/>
              </svg>
              {property.baths} Baths
            </span>
          )}
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
            </svg>
            {property.sqft.toLocaleString()} sqft
          </span>
        </div>

        {/* Price + CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
          <div>
            <p style={{ fontSize: "19px", fontWeight: 800, color: "#D85A30", margin: 0, lineHeight: 1 }}>
              {property.price}
            </p>
            <p style={{ fontSize: "11px", color: "#bbb", margin: "3px 0 0" }}>by {property.postedBy}</p>
          </div>

          <button
            onClick={() => setShowPhone((p) => !p)}
            style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "7px 12px",
              background: showPhone ? "#1D9E75" : "#fff",
              color: showPhone ? "#fff" : "#1D9E75",
              border: "1.5px solid #1D9E75",
              borderRadius: "8px", fontSize: "12px", fontWeight: 600,
              cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.55 12 19.79 19.79 0 01.46 4.18 2 2 0 012.44 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 9.4a16 16 0 006.18 6.18l1.76-1.76a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            {showPhone ? property.phone : "Contact"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────
const PropertiesPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialType = (searchParams.get("type") as PropertyType) || "all";
  const [activeTab, setActiveTab] = useState<PropertyType>(initialType);
  const [activeCategory, setActiveCategory] = useState<PropertyCategory>("all");
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    const t = searchParams.get("type") as PropertyType;
    if (t && ["buy", "sell", "rent"].includes(t)) setActiveTab(t);
    else setActiveTab("all");
  }, [searchParams]);

  const filtered = ALL_PROPERTIES.filter((p) => {
    const matchTab = activeTab === "all" || p.type === activeTab;
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchArea = selectedArea === "All Areas" || p.area === selectedArea;
    const matchSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchCat && matchArea && matchSearch;
  });

  const handleViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    if (mode === "map") setMapKey((k) => k + 1);
  };

  const tabs: { key: PropertyType; label: string; accent: string }[] = [
    { key: "all",  label: "All Properties", accent: "#444" },
    { key: "buy",  label: "Buy",            accent: "#1D9E75" },
    { key: "sell", label: "Sell",           accent: "#D85A30" },
    { key: "rent", label: "Rent",           accent: "#185FA5" },
  ];

  const counts = {
    all: ALL_PROPERTIES.length,
    buy: ALL_PROPERTIES.filter(p => p.type === "buy").length,
    sell: ALL_PROPERTIES.filter(p => p.type === "sell").length,
    rent: ALL_PROPERTIES.filter(p => p.type === "rent").length,
  };

  return (
    <>
    <Navbar/>
  
    <div style={{ minHeight: "100vh", background: "#f7f6f2", fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap');
        .prop-search-input::placeholder { color: rgba(255,255,255,0.5); }
        .prop-search-input:focus { outline: none; }
      `}</style>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div style={{
        background: "#111827",
        padding: "52px 24px 44px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background texture dots */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        <div style={{ maxWidth: "880px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(216,90,48,0.15)", border: "1px solid rgba(216,90,48,0.3)", borderRadius: "20px", padding: "4px 14px", marginBottom: "16px" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="#D85A30"><circle cx="5" cy="5" r="5"/></svg>
            <span style={{ color: "#D85A30", fontSize: "12px", fontWeight: 600, letterSpacing: "0.5px" }}>LUDHIANA REAL ESTATE</span>
          </div>

          <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 800, color: "#fff", margin: "0 0 10px", lineHeight: 1.15, letterSpacing: "-0.5px" }}>
            Find Your Perfect<br />
            <span style={{ color: "#D85A30" }}>Property in Ludhiana</span>
          </h1>
          <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "32px" }}>
            {ALL_PROPERTIES.length}+ verified listings · Buy, Sell &amp; Rent · All major areas
          </p>

          {/* Search Row */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <div style={{
              flex: 1, minWidth: "220px",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "12px", display: "flex", alignItems: "center",
              padding: "0 14px", gap: "10px",
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                className="prop-search-input"
                type="text"
                placeholder="Search property name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1, background: "transparent", border: "none",
                  color: "#fff", fontSize: "14px", padding: "14px 0",
                }}
              />
            </div>

            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              style={{
                padding: "0 16px", minWidth: "186px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: "12px", color: "#fff",
                fontSize: "14px", outline: "none", cursor: "pointer",
              }}
            >
              {LUDHIANA_AREAS.map((a) => (
                <option key={a} value={a} style={{ color: "#111", background: "#fff" }}>{a}</option>
              ))}
            </select>

            <button
              style={{
                padding: "0 28px", background: "#D85A30", color: "#fff",
                border: "none", borderRadius: "12px",
                fontSize: "14px", fontWeight: 700, cursor: "pointer",
                minHeight: "50px",
              }}
            >
              Search
            </button>
          </div>

          {/* Quick stat chips */}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
            {[
              { label: "For Sale", count: counts.buy, color: "#1D9E75" },
              { label: "Selling", count: counts.sell, color: "#D85A30" },
              { label: "For Rent", count: counts.rent, color: "#185FA5" },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "4px 12px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: s.color, display: "inline-block" }} />
                <span style={{ fontSize: "12px", color: "#9ca3af" }}>{s.count} {s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky Controls ───────────────────────────────────────────────── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #ebe9e1", position: "sticky", top: "64px", zIndex: 40 }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>

          {/* Type Tabs */}
          <div style={{ display: "flex" }}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: "15px 18px",
                  border: "none", background: "transparent",
                  fontSize: "13.5px",
                  fontWeight: activeTab === tab.key ? 700 : 400,
                  color: activeTab === tab.key ? tab.accent : "#9ca3af",
                  borderBottom: activeTab === tab.key ? `2.5px solid ${tab.accent}` : "2.5px solid transparent",
                  cursor: "pointer", transition: "all 0.15s",
                  display: "flex", alignItems: "center", gap: "6px",
                }}
              >
                {tab.label}
                <span style={{
                  fontSize: "10px", fontWeight: 700,
                  background: activeTab === tab.key ? tab.accent : "#f0ede8",
                  color: activeTab === tab.key ? "#fff" : "#999",
                  padding: "1px 7px", borderRadius: "10px",
                  transition: "all 0.15s",
                }}>
                  {counts[tab.key]}
                </span>
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0" }}>
            {/* Category Filter */}
            <div style={{ display: "flex", gap: "6px" }}>
              {(["all", "residential", "commercial"] as PropertyCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "5px 13px",
                    border: `1.5px solid ${activeCategory === cat ? "#D85A30" : "#ebe9e1"}`,
                    borderRadius: "20px",
                    background: activeCategory === cat ? "#D85A30" : "transparent",
                    color: activeCategory === cat ? "#fff" : "#666",
                    fontSize: "12px", fontWeight: 500, cursor: "pointer",
                    textTransform: "capitalize", transition: "all 0.15s",
                  }}
                >
                  {cat === "all" ? "All Types" : cat}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div style={{ display: "flex", background: "#f7f6f2", borderRadius: "8px", border: "1px solid #ebe9e1", overflow: "hidden" }}>
              {([
                { mode: "grid" as ViewMode, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
                { mode: "map" as ViewMode, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg> },
              ]).map(({ mode, icon }) => (
                <button
                  key={mode}
                  onClick={() => handleViewMode(mode)}
                  style={{
                    padding: "7px 12px",
                    background: viewMode === mode ? "#fff" : "transparent",
                    border: "none",
                    color: viewMode === mode ? "#D85A30" : "#999",
                    cursor: "pointer", transition: "all 0.15s",
                    display: "flex", alignItems: "center",
                    boxShadow: viewMode === mode ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "28px 24px 60px" }}>

        {/* Area chips */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
          {LUDHIANA_AREAS.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              style={{
                padding: "5px 14px",
                border: `1px solid ${selectedArea === area ? "#185FA5" : "#ebe9e1"}`,
                borderRadius: "20px",
                background: selectedArea === area ? "#185FA5" : "#fff",
                color: selectedArea === area ? "#fff" : "#666",
                fontSize: "12px", cursor: "pointer", transition: "all 0.15s",
                fontWeight: selectedArea === area ? 600 : 400,
              }}
            >
              {area}
            </button>
          ))}
        </div>

        {/* Results header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
            Showing <strong style={{ color: "#111" }}>{filtered.length}</strong> propert{filtered.length !== 1 ? "ies" : "y"}
            {selectedArea !== "All Areas" && <> in <strong style={{ color: "#D85A30" }}>{selectedArea}</strong></>}
          </p>
          {/* <button
            onClick={() => navigate("/list-your-business")}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "9px 18px", background: "#111827", color: "#fff",
              border: "none", borderRadius: "9px",
              fontSize: "13px", fontWeight: 600, cursor: "pointer",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Post Property Free
          </button> */}
        </div>

        {/* ── Grid View ── */}
        {viewMode === "grid" && (
          <>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: "#bbb" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d4d0c8" strokeWidth="1.2" style={{ marginBottom: "16px" }} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                </svg>
                <p style={{ fontSize: "16px", fontWeight: 600, color: "#888", margin: "0 0 6px" }}>No properties found</p>
                <p style={{ fontSize: "13px", color: "#bbb" }}>Try a different area or category</p>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
                gap: "20px",
              }}>
                {filtered.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Map View ── */}
        {viewMode === "map" && (
          <div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "14px" }}>
              {[
                { color: "#1D9E75", label: "Buy" },
                { color: "#D85A30", label: "Sell" },
                { color: "#185FA5", label: "Rent" },
              ].map(l => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#666" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: l.color, display: "inline-block" }} />
                  {l.label}
                </div>
              ))}
              <span style={{ fontSize: "12px", color: "#bbb", marginLeft: "8px" }}>· Click a pin to see details</span>
            </div>
            <MapView key={mapKey} properties={filtered} />

            {/* Property list below map */}
            <div style={{ marginTop: "28px" }}>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#444", marginBottom: "14px" }}>
                {filtered.length} properties in this view
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "16px" }}>
                {filtered.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div style={{
          marginTop: "56px",
          background: "#111827",
          borderRadius: "20px",
          padding: "44px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "24px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", right: "-20px", top: "-20px", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(216,90,48,0.08)", pointerEvents: "none" }} />
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", margin: "0 0 6px" }}>
              Want to sell or rent your property?
            </h2>
            <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>
              List for free · Reach thousands of buyers in Ludhiana
            </p>
          </div>
          {/* <button
            onClick={() => navigate("/list-your-business")}
            style={{
              padding: "13px 32px",
              background: "#D85A30", color: "#fff",
              border: "none", borderRadius: "12px",
              fontSize: "15px", fontWeight: 700, cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Post Property — It's Free
          </button> */}
        </div>
      </div>
    </div>
    <Footer/>
      </>
  );
};

export default PropertiesPage;