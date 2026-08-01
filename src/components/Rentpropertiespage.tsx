import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const STORAGE_KEY = "shehar_ludhiana_user";
const REDIRECT_KEY = "shehar_ludhiana_redirect";

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
  description?: string;
  lat: number;
  lng: number;
}

const LUDHIANA_AREAS = [
  "All Areas","Model Town","BRS Nagar","Sarabha Nagar","Civil Lines",
  "Dugri","Pakhowal Road","Ferozepur Road","Haibowal",
  "Gurdev Nagar","Urban Estate","Sector 32","Kitchlu Nagar",
];

const ALL_PROPERTIES: Property[] = [
  {
    id:7, title:"2BHK Furnished Flat", location:"Pakhowal Road, Ludhiana", area:"Pakhowal Road",
    price:"₹18,000/mo", type:"rent", category:"residential", beds:2, baths:1, sqft:950, tag:"Furnished",
    image:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    postedBy:"Navdeep Arora", phone:"98776 65544",
    description:"Fully furnished 2BHK with sofa, bed, AC, and modular kitchen. Ideal for working professionals. Immediate availability, easy access to main road.",
    lat:30.8920, lng:75.8700,
  },
  {
    id:8, title:"1BHK Near Bus Stand", location:"Sector 32, Ludhiana", area:"Sector 32",
    price:"₹9,500/mo", type:"rent", category:"residential", beds:1, baths:1, sqft:550, tag:"Budget",
    image:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
    postedBy:"Kiran Properties", phone:"99112 23344",
    description:"Affordable 1BHK just 5 minutes from bus stand. All basic amenities, water and electricity included. Best suited for students and single professionals.",
    lat:30.8750, lng:75.8600,
  },
  {
    id:9, title:"Showroom Ground Floor", location:"Gurdev Nagar, Ludhiana", area:"Gurdev Nagar",
    price:"₹45,000/mo", type:"rent", category:"commercial", sqft:1800, tag:"Prime Location",
    image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    postedBy:"Metro Realtors", phone:"98761 12233",
    description:"Premium showroom space on ground floor in a busy commercial area. Glass facade, parking space, suitable for any retail brand or showroom.",
    lat:30.9080, lng:75.8420,
  },
  {
    id:11, title:"Warehouse / Godown", location:"Urban Estate, Ludhiana", area:"Urban Estate",
    price:"₹28,000/mo", type:"rent", category:"commercial", sqft:5000,
    image:"https://images.unsplash.com/photo-1553267751-1c148a7280a1?w=600&q=80",
    postedBy:"Industrial Hub", phone:"99001 12244",
    description:"Large warehouse with 20ft height, heavy vehicle access, loading docks. Ideal for manufacturing, storage or logistics operations.",
    lat:30.8820, lng:75.8800,
  },
];

// ─── Property Detail Modal ────────────────────────────────────────────────────
const PropertyDetailModal = ({ property, onClose }: { property: Property; onClose: () => void }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ background: "#fff", borderRadius: "20px", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", position: "relative", boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "14px", right: "14px", zIndex: 10, width: "32px", height: "32px", borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        <div style={{ height: "240px", overflow: "hidden", borderRadius: "20px 20px 0 0", background: "#f0ede8", position: "relative" }}>
          {!imgError ? <img src={property.image} alt={property.title} onError={() => setImgError(true)} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
          )}
          <div style={{ position: "absolute", top: "14px", left: "14px", display: "flex", gap: "6px" }}>
            <span style={{ background: "#e6f1fb", color: "#0c447c", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px" }}>For Rent</span>
            {property.tag && <span style={{ background: "rgba(255,255,255,0.95)", color: "#444", fontSize: "10px", fontWeight: 600, padding: "3px 9px", borderRadius: "20px", border: "1px solid #eee" }}>{property.tag}</span>}
          </div>
        </div>
        <div style={{ padding: "22px 24px 28px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "6px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#111", margin: 0, lineHeight: 1.3 }}>{property.title}</h2>
            <p style={{ fontSize: "22px", fontWeight: 800, color: "#185FA5", margin: 0, whiteSpace: "nowrap" }}>{property.price}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#888", fontSize: "13px", marginBottom: "18px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {property.location}
          </div>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", padding: "14px 16px", background: "#f7f6f2", borderRadius: "12px", marginBottom: "18px" }}>
            {property.beds && <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8"/><path d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/></svg><span style={{ fontSize: "14px", fontWeight: 700, color: "#111" }}>{property.beds}</span><span style={{ fontSize: "11px", color: "#888" }}>Beds</span></div>}
            {property.baths && <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20v2a6 6 0 01-6 6H8a6 6 0 01-6-6v-2z"/><path d="M5 12V5a2 2 0 014 0"/></svg><span style={{ fontSize: "14px", fontWeight: 700, color: "#111" }}>{property.baths}</span><span style={{ fontSize: "11px", color: "#888" }}>Baths</span></div>}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg><span style={{ fontSize: "14px", fontWeight: 700, color: "#111" }}>{property.sqft.toLocaleString()}</span><span style={{ fontSize: "11px", color: "#888" }}>sqft</span></div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg><span style={{ fontSize: "14px", fontWeight: 700, color: "#111", textTransform: "capitalize" }}>{property.category}</span><span style={{ fontSize: "11px", color: "#888" }}>Type</span></div>
          </div>
          {property.description && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#444", margin: "0 0 6px" }}>About this property</p>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.65, margin: 0 }}>{property.description}</p>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", border: "1px solid #f0ede8", borderRadius: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#e6f1fb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#111", margin: 0 }}>{property.postedBy}</p>
                <p style={{ fontSize: "11px", color: "#999", margin: 0 }}>Property Owner / Agent</p>
              </div>
            </div>
            <a href={`tel:${property.phone}`} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "9px 18px", background: "#185FA5", color: "#fff", borderRadius: "10px", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.55 12 19.79 19.79 0 01.46 4.18 2 2 0 012.44 2h3a2 2 0 012 1.72c.13.72.34 1.42.7 2.81a2 2 0 01-.45 2.11L6.91 9.4a16 16 0 006.18 6.18l1.76-1.76a2 2 0 012.11-.45c1.39.36 2.09.57 2.81.7A2 2 0 0122 16.92z"/></svg>
              {property.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Map View ─────────────────────────────────────────────────────────────────
const MapView = ({ properties }: { properties: Property[] }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  useEffect(() => {
    if (!mapRef.current) return;
    if (!document.getElementById("leaflet-css")) { const link = document.createElement("link"); link.id = "leaflet-css"; link.rel = "stylesheet"; link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.appendChild(link); }
    const initMap = () => {
      if (!(window as any).L || mapInstanceRef.current) return;
      const L = (window as any).L;
      const map = L.map(mapRef.current!, { zoomControl: true, scrollWheelZoom: false }); mapInstanceRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap contributors" }).addTo(map);
      map.setView([30.8920, 75.8700], 13);
      properties.forEach((p) => { const icon = L.divIcon({ className: "", html: `<div style="background:#185FA5;color:#fff;font-size:11px;font-weight:700;padding:4px 8px;border-radius:20px;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.25);border:2px solid #fff;">${p.price}</div>`, iconAnchor: [0,0] }); L.marker([p.lat, p.lng], { icon }).addTo(map).bindPopup(`<div style="font-family:system-ui;min-width:180px"><img src="${p.image}" style="width:100%;height:100px;object-fit:cover;border-radius:6px;margin-bottom:8px"/><strong style="font-size:13px">${p.title}</strong><br/><span style="font-size:11px;color:#888">${p.location}</span><br/><span style="font-size:14px;font-weight:700;color:#185FA5">${p.price}</span></div>`); });
    };
    if ((window as any).L) initMap(); else { const s = document.createElement("script"); s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"; s.onload = initMap; document.head.appendChild(s); }
    return () => { if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; } };
  }, []);
  return <div ref={mapRef} style={{ width: "100%", height: "560px", borderRadius: "16px", overflow: "hidden", border: "1px solid #e5e7eb" }} />;
};

// ─── Property Card ─────────────────────────────────────────────────────────────
const PropertyCard = ({ property, index, onViewDetails }: { property: Property; index: number; onViewDetails: (p: Property) => void }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <div style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #f0efe8", transition: "box-shadow 0.22s, transform 0.22s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}>
      <div style={{ position: "relative", height: "196px", overflow: "hidden", background: "#f5f5f0" }}>
        {!imgError ? <img src={property.image} alt={property.title} onError={() => setImgError(true)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0ede8" }}><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>}
        <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "6px" }}>
          <span style={{ background: "#e6f1fb", color: "#0c447c", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px" }}>For Rent</span>
          {property.tag && <span style={{ background: "rgba(255,255,255,0.95)", color: "#444", fontSize: "10px", fontWeight: 600, padding: "3px 9px", borderRadius: "20px", border: "1px solid #eee" }}>{property.tag}</span>}
        </div>
        <span style={{ position: "absolute", bottom: "10px", right: "12px", background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "10px", padding: "3px 9px", borderRadius: "12px", textTransform: "capitalize" }}>{property.category}</span>
      </div>
      <div style={{ padding: "15px 16px 16px" }}>
        <p style={{ fontSize: "15px", fontWeight: 700, color: "#111", margin: "0 0 4px", lineHeight: 1.3 }}>{property.title}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#999", fontSize: "12px", marginBottom: "10px" }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>{property.location}</div>
        <div style={{ display: "flex", gap: "12px", color: "#666", fontSize: "12px", marginBottom: "13px", flexWrap: "wrap" }}>
          {property.beds && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8"/><path d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/></svg>{property.beds} Beds</span>}
          {property.baths && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20v2a6 6 0 01-6 6H8a6 6 0 01-6-6v-2z"/><path d="M5 12V5a2 2 0 014 0"/></svg>{property.baths} Baths</span>}
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>{property.sqft.toLocaleString()} sqft</span>
        </div>
        <p style={{ fontSize: "19px", fontWeight: 800, color: "#185FA5", margin: "0 0 2px", lineHeight: 1 }}>{property.price}</p>
        <p style={{ fontSize: "11px", color: "#bbb", margin: "0 0 12px" }}>by {property.postedBy}</p>
        <button onClick={() => onViewDetails(property)}
          style={{ width: "100%", padding: "9px 0", background: "#185FA5", color: "#fff", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", transition: "background 0.15s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#0e4a85")}
          onMouseLeave={e => (e.currentTarget.style.background = "#185FA5")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          View Details
        </button>
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────
const RentPropertiesPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<PropertyCategory>("all");
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [mapKey, setMapKey] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const RENT_PROPERTIES = ALL_PROPERTIES.filter(p => p.type === "rent");

  const filtered = RENT_PROPERTIES.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchArea = selectedArea === "All Areas" || p.area === selectedArea;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchArea && matchSearch;
  });

  // ── Auth check before showing details ─────────────────────────────────────
  const handleViewDetails = (property: Property) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const user = raw ? JSON.parse(raw) : null;
      if (user) {
        setSelectedProperty(property);
      } else {
        localStorage.setItem(REDIRECT_KEY, "/rent-property");
        navigate("/login");
      }
    } catch {
      localStorage.setItem(REDIRECT_KEY, "/rent-property");
      navigate("/login");
    }
  };

  const handleViewMode = (mode: ViewMode) => { setViewMode(mode); if (mode === "map") setMapKey((k) => k + 1); };

  return (
    <>
      <Navbar />
      {selectedProperty && <PropertyDetailModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />}

      <div style={{ minHeight: "100vh", background: "#f7f6f2", fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap'); .prop-search-input::placeholder{color:rgba(255,255,255,0.5)} .prop-search-input:focus{outline:none}`}</style>

        {/* Hero */}
        <div style={{ background: "#0a0f1c", padding: "52px 24px 44px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div style={{ maxWidth: "880px", margin: "0 auto", position: "relative" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(24,95,165,0.15)", border: "1px solid rgba(24,95,165,0.3)", borderRadius: "20px", padding: "4px 14px", marginBottom: "16px" }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="#185FA5"><circle cx="5" cy="5" r="5"/></svg>
              <span style={{ color: "#185FA5", fontSize: "12px", fontWeight: 600, letterSpacing: "0.5px" }}>RENT PROPERTY · LUDHIANA</span>
            </div>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 800, color: "#fff", margin: "0 0 10px", lineHeight: 1.15, letterSpacing: "-0.5px" }}>
              Properties for Rent<br /><span style={{ color: "#4d9ee8" }}>in Ludhiana</span>
            </h1>
            <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "32px" }}>{RENT_PROPERTIES.length}+ verified listings · Residential &amp; Commercial · All major areas</p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "220px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "12px", display: "flex", alignItems: "center", padding: "0 14px", gap: "10px" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <input className="prop-search-input" type="text" placeholder="Search property name or location..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ flex: 1, background: "transparent", border: "none", color: "#fff", fontSize: "14px", padding: "14px 0" }} />
              </div>
              <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} style={{ padding: "0 16px", minWidth: "186px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "12px", color: "#fff", fontSize: "14px", outline: "none", cursor: "pointer" }}>
                {LUDHIANA_AREAS.map((a) => <option key={a} value={a} style={{ color: "#111", background: "#fff" }}>{a}</option>)}
              </select>
              <button style={{ padding: "0 28px", background: "#185FA5", color: "#fff", border: "none", borderRadius: "12px", fontSize: "14px", fontWeight: 700, cursor: "pointer", minHeight: "50px" }}>Search</button>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
              {[{ label: "Residential", count: RENT_PROPERTIES.filter(p => p.category === "residential").length }, { label: "Commercial", count: RENT_PROPERTIES.filter(p => p.category === "commercial").length }].map(s => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "4px 12px" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#185FA5", display: "inline-block" }} />
                  <span style={{ fontSize: "12px", color: "#9ca3af" }}>{s.count} {s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Controls */}
        <div style={{ background: "#fff", borderBottom: "1px solid #ebe9e1", position: "sticky", top: "64px", zIndex: 40 }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div style={{ padding: "14px 0" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#185FA5", borderBottom: "2.5px solid #185FA5", paddingBottom: "14px", marginBottom: "-14px" }}>Rent · {RENT_PROPERTIES.length} listings</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                {(["all", "residential", "commercial"] as PropertyCategory[]).map((cat) => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "5px 13px", border: `1.5px solid ${activeCategory === cat ? "#185FA5" : "#ebe9e1"}`, borderRadius: "20px", background: activeCategory === cat ? "#185FA5" : "transparent", color: activeCategory === cat ? "#fff" : "#666", fontSize: "12px", fontWeight: 500, cursor: "pointer", textTransform: "capitalize", transition: "all 0.15s" }}>
                    {cat === "all" ? "All Types" : cat}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", background: "#f7f6f2", borderRadius: "8px", border: "1px solid #ebe9e1", overflow: "hidden" }}>
                {([{ mode: "grid" as ViewMode, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> }, { mode: "map" as ViewMode, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg> }]).map(({ mode, icon }) => (
                  <button key={mode} onClick={() => handleViewMode(mode)} style={{ padding: "7px 12px", background: viewMode === mode ? "#fff" : "transparent", border: "none", color: viewMode === mode ? "#185FA5" : "#999", cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", boxShadow: viewMode === mode ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>{icon}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "28px 24px 60px" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
            {LUDHIANA_AREAS.map((area) => (
              <button key={area} onClick={() => setSelectedArea(area)} style={{ padding: "5px 14px", border: `1px solid ${selectedArea === area ? "#185FA5" : "#ebe9e1"}`, borderRadius: "20px", background: selectedArea === area ? "#185FA5" : "#fff", color: selectedArea === area ? "#fff" : "#666", fontSize: "12px", cursor: "pointer", transition: "all 0.15s", fontWeight: selectedArea === area ? 600 : 400 }}>{area}</button>
            ))}
          </div>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 20px" }}>
            Showing <strong style={{ color: "#111" }}>{filtered.length}</strong> propert{filtered.length !== 1 ? "ies" : "y"} for rent{selectedArea !== "All Areas" && <> in <strong style={{ color: "#185FA5" }}>{selectedArea}</strong></>}
          </p>

          {viewMode === "grid" && (
            filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <p style={{ fontSize: "16px", fontWeight: 600, color: "#888", margin: "0 0 6px" }}>No rental properties found</p>
                <p style={{ fontSize: "13px", color: "#bbb" }}>Try a different area or category</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "20px" }}>
                {filtered.map((p, i) => <PropertyCard key={p.id} property={p} index={i} onViewDetails={handleViewDetails} />)}
              </div>
            )
          )}

          {viewMode === "map" && (
            <div>
              <MapView key={mapKey} properties={filtered} />
              <div style={{ marginTop: "28px" }}>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#444", marginBottom: "14px" }}>{filtered.length} rental properties in this view</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "16px" }}>
                  {filtered.map((p, i) => <PropertyCard key={p.id} property={p} index={i} onViewDetails={handleViewDetails} />)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RentPropertiesPage;