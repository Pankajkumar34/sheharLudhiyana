import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// ─── Types ────────────────────────────────────────────────────────────────────
interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

interface FormData {
  listingType: "sell" | "rent" | "buy";
  propertyType: "residential" | "commercial" | "plot";
  title: string;
  description: string;
  price: string;
  priceUnit: "total" | "per-month" | "per-sqft";
  area: string;
  areaUnit: "sqft" | "sqyd" | "marla" | "kanal";
  bedrooms: string;
  bathrooms: string;
  floors: string;
  age: string;
  furnishing: "unfurnished" | "semi-furnished" | "furnished";
  facing: string;
  location: string;
  landmark: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
}

// ─── Ludhiana Areas ───────────────────────────────────────────────────────────
const AREAS = [
  "Model Town","BRS Nagar","Sarabha Nagar","Civil Lines","Dugri",
  "Pakhowal Road","Ferozepur Road","Haibowal","Gurdev Nagar",
  "Urban Estate","Sector 32","Kitchlu Nagar","Shaheed Bhagat Singh Nagar",
  "Bhai Randhir Singh Nagar","Rajguru Nagar","Daba Road","Jagraon Bridge",
];

// ─── Step indicator ───────────────────────────────────────────────────────────
const StepDot = ({ step, current, label }: { step: number; current: number; label: string }) => {
  const done = current > step;
  const active = current === step;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <div style={{
        width: "34px", height: "34px", borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "13px", fontWeight: 700,
        background: done ? "#1D9E75" : active ? "#D85A30" : "#f0ede8",
        color: done || active ? "#fff" : "#bbb",
        border: active ? "2.5px solid #D85A30" : done ? "2.5px solid #1D9E75" : "2px solid #e8e4dc",
        transition: "all 0.25s",
      }}>
        {done
          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          : step
        }
      </div>
      <span style={{ fontSize: "11px", color: active ? "#D85A30" : done ? "#1D9E75" : "#bbb", fontWeight: active ? 600 : 400, whiteSpace: "nowrap" }}>
        {label}
      </span>
    </div>
  );
};

// ─── Field wrapper ─────────────────────────────────────────────────────────────
const Field = ({ label, required, children, hint }: { label: string; required?: boolean; children: React.ReactNode; hint?: string }) => (
  <div style={{ marginBottom: "20px" }}>
    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
      {label} {required && <span style={{ color: "#D85A30" }}>*</span>}
    </label>
    {children}
    {hint && <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>{hint}</p>}
  </div>
);

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px",
  border: "1.5px solid #e8e4dc", borderRadius: "10px",
  fontSize: "14px", color: "#111", background: "#fff",
  outline: "none", boxSizing: "border-box",
  transition: "border-color 0.15s",
  fontFamily: "inherit",
};

const selectStyle: React.CSSProperties = { ...inputStyle, cursor: "pointer" };

// ─── Main Page ─────────────────────────────────────────────────────────────────
const SellProperty = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormData>({
    listingType: "sell",
    propertyType: "residential",
    title: "",
    description: "",
    price: "",
    priceUnit: "total",
    area: "",
    areaUnit: "sqft",
    bedrooms: "",
    bathrooms: "",
    floors: "",
    age: "",
    furnishing: "unfurnished",
    facing: "",
    location: "",
    landmark: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
  });

  const set = (key: keyof FormData, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  // ── Image handling ──────────────────────────────────────────────────────────
  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newImgs: UploadedImage[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 10 - images.length)
      .map((file) => ({
        id: Math.random().toString(36).slice(2),
        file,
        preview: URL.createObjectURL(file),
      }));
    setImages((prev) => [...prev, ...newImgs]);
  }, [images.length]);

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f6f2", fontFamily: "'DM Sans', system-ui, sans-serif", padding: "40px 24px" }}>
        <div style={{ textAlign: "center", maxWidth: "420px" }}>
          <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#dcfdf1", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#111", margin: "0 0 10px" }}>Property Listed!</h2>
          <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "28px" }}>
            Your property <strong>"{form.title}"</strong> has been submitted. Our team will review and publish it within 24 hours.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button
              onClick={() => navigate("/properties")}
              style={{ padding: "11px 24px", background: "#D85A30", color: "#fff", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}
            >
              View Listings
            </button>
            <button
              onClick={() => { setSubmitted(false); setStep(1); setImages([]); setForm({ listingType:"sell",propertyType:"residential",title:"",description:"",price:"",priceUnit:"total",area:"",areaUnit:"sqft",bedrooms:"",bathrooms:"",floors:"",age:"",furnishing:"unfurnished",facing:"",location:"",landmark:"",ownerName:"",ownerPhone:"",ownerEmail:"" }); }}
              style={{ padding: "11px 24px", background: "#fff", color: "#444", border: "1.5px solid #e8e4dc", borderRadius: "10px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}
            >
              Add Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Card wrapper ─────────────────────────────────────────────────────────
  const Card = ({ children, title, subtitle }: { children: React.ReactNode; title?: string; subtitle?: string }) => (
    <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f0ede8", padding: "28px", marginBottom: "20px" }}>
      {title && (
        <div style={{ marginBottom: "22px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{title}</h3>
          {subtitle && <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );

  const grid2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" };
  const grid3: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" };

  return (
        <>
    <Navbar/>
    <div style={{ minHeight: "100vh", background: "#f7f6f2", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        input:focus, select:focus, textarea:focus { border-color: #D85A30 !important; box-shadow: 0 0 0 3px rgba(216,90,48,0.08); }
        .type-pill { transition: all 0.15s; cursor: pointer; }
        .type-pill:hover { border-color: #D85A30 !important; }
        .img-thumb:hover .img-del { opacity: 1 !important; }
      `}</style>

      {/* ── Header ── */}
      <div style={{ background: "#111827", padding: "32px 24px 28px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <button onClick={() => navigate(-1)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "#6b7280", fontSize: "13px", cursor: "pointer", marginBottom: "16px", padding: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            Back
          </button>
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#fff", margin: "0 0 6px" }}>List Your Property</h1>
          <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 28px" }}>Fill in the details and reach thousands of buyers in Ludhiana — completely free.</p>

          {/* Step indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
            {[
              { n: 1, label: "Photos" },
              { n: 2, label: "Details" },
              { n: 3, label: "Pricing" },
              { n: 4, label: "Location" },
              { n: 5, label: "Contact" },
            ].map((s, i, arr) => (
              <div key={s.n} style={{ display: "flex", alignItems: "center", flex: i < arr.length - 1 ? 1 : "none" }}>
                <StepDot step={s.n} current={step} label={s.label} />
                {i < arr.length - 1 && (
                  <div style={{ flex: 1, height: "2px", background: step > s.n ? "#1D9E75" : "#2d3748", margin: "0 8px", marginBottom: "20px", transition: "background 0.3s" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Form Body ── */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "28px 24px 60px" }}>

        {/* ══ STEP 1: Photos ══ */}
        {step === 1 && (
          <>
            <Card title="Property Photos" subtitle="Upload up to 10 photos · First photo will be the cover image">
              {/* Drop zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                style={{
                  border: `2px dashed ${dragging ? "#D85A30" : "#e8e4dc"}`,
                  borderRadius: "14px",
                  padding: "40px 24px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: dragging ? "rgba(216,90,48,0.04)" : "#fdfcfa",
                  transition: "all 0.2s",
                  marginBottom: images.length > 0 ? "20px" : "0",
                }}
              >
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#f0ede8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D85A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <p style={{ fontWeight: 700, color: "#333", margin: "0 0 4px", fontSize: "15px" }}>
                  {dragging ? "Drop photos here" : "Click to upload photos"}
                </p>
                <p style={{ fontSize: "12px", color: "#bbb", margin: 0 }}>
                  JPG, PNG, WEBP · Max 10 photos · Drag &amp; drop supported
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => addFiles(e.target.files)}
                />
              </div>

              {/* Thumbnails */}
              {images.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
                  {images.map((img, i) => (
                    <div
                      key={img.id}
                      className="img-thumb"
                      style={{ position: "relative", borderRadius: "10px", overflow: "hidden", aspectRatio: "4/3", background: "#f0ede8" }}
                    >
                      <img src={img.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      {i === 0 && (
                        <div style={{ position: "absolute", bottom: "6px", left: "6px", background: "#D85A30", color: "#fff", fontSize: "9px", fontWeight: 700, padding: "2px 7px", borderRadius: "10px" }}>
                          COVER
                        </div>
                      )}
                      <button
                        className="img-del"
                        onClick={() => removeImage(img.id)}
                        style={{
                          position: "absolute", top: "5px", right: "5px",
                          width: "22px", height: "22px", borderRadius: "50%",
                          background: "rgba(0,0,0,0.65)", border: "none", color: "#fff",
                          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                          opacity: 0, transition: "opacity 0.15s",
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                  ))}

                  {/* Add more */}
                  {images.length < 10 && (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      style={{ aspectRatio: "4/3", border: "2px dashed #e8e4dc", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#ccc", fontSize: "12px", gap: "4px", background: "#fdfcfa" }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      Add more
                    </div>
                  )}
                </div>
              )}

              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "14px", marginBottom: 0 }}>
                {images.length}/10 photos uploaded
                {images.length === 0 && " · You can skip photos and add them later"}
              </p>
            </Card>
          </>
        )}

        {/* ══ STEP 2: Property Details ══ */}
        {step === 2 && (
          <>
            <Card title="Listing Type" subtitle="What are you looking to do?">
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {(["sell", "rent"] as const).map((t) => (
                  <button
                    key={t}
                    className="type-pill"
                    onClick={() => set("listingType", t)}
                    style={{
                      padding: "10px 24px", borderRadius: "10px",
                      border: `2px solid ${form.listingType === t ? "#D85A30" : "#e8e4dc"}`,
                      background: form.listingType === t ? "#fff8f5" : "#fff",
                      color: form.listingType === t ? "#D85A30" : "#666",
                      fontWeight: form.listingType === t ? 700 : 400,
                      fontSize: "14px",
                    }}
                  >
                    {t === "sell" ? "🏷️ Sell" : "🔑 Rent Out"}
                  </button>
                ))}
              </div>
            </Card>

            <Card title="Property Type">
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {(["residential", "commercial", "plot"] as const).map((t) => {
                  const icons = { residential: "🏠", commercial: "🏢", plot: "🗺️" };
                  return (
                    <button
                      key={t}
                      className="type-pill"
                      onClick={() => set("propertyType", t)}
                      style={{
                        padding: "10px 22px", borderRadius: "10px",
                        border: `2px solid ${form.propertyType === t ? "#185FA5" : "#e8e4dc"}`,
                        background: form.propertyType === t ? "#f0f6ff" : "#fff",
                        color: form.propertyType === t ? "#185FA5" : "#666",
                        fontWeight: form.propertyType === t ? 700 : 400,
                        fontSize: "14px", textTransform: "capitalize",
                      }}
                    >
                      {icons[t]} {t}
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card title="Property Information">
              <Field label="Property Title" required hint="e.g. 3BHK Spacious Flat in Model Town">
                <input
                  style={inputStyle} placeholder="Enter a clear, descriptive title"
                  value={form.title} onChange={(e) => set("title", e.target.value)}
                />
              </Field>

              <Field label="Description" hint="Describe key features, nearby landmarks, why it's a good buy...">
                <textarea
                  style={{ ...inputStyle, minHeight: "110px", resize: "vertical", lineHeight: "1.6" }}
                  placeholder="Write about the property..."
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                />
              </Field>

              <div style={grid2}>
                <Field label="Covered Area" required>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <input
                      style={{ ...inputStyle, flex: 1 }} type="number" placeholder="e.g. 1450"
                      value={form.area} onChange={(e) => set("area", e.target.value)}
                    />
                    <select style={{ ...selectStyle, width: "100px" }} value={form.areaUnit} onChange={(e) => set("areaUnit", e.target.value)}>
                      <option value="sqft">sq.ft</option>
                      <option value="sqyd">sq.yd</option>
                      <option value="marla">Marla</option>
                      <option value="kanal">Kanal</option>
                    </select>
                  </div>
                </Field>

                <Field label="Age of Property">
                  <select style={selectStyle} value={form.age} onChange={(e) => set("age", e.target.value)}>
                    <option value="">Select age</option>
                    <option value="new">New / Under Construction</option>
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-5">1–5 years</option>
                    <option value="5-10">5–10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </Field>
              </div>

              {form.propertyType === "residential" && (
                <div style={grid3}>
                  <Field label="Bedrooms">
                    <select style={selectStyle} value={form.bedrooms} onChange={(e) => set("bedrooms", e.target.value)}>
                      <option value="">—</option>
                      {["1","2","3","4","5","6+"].map(n => <option key={n} value={n}>{n} BHK</option>)}
                    </select>
                  </Field>
                  <Field label="Bathrooms">
                    <select style={selectStyle} value={form.bathrooms} onChange={(e) => set("bathrooms", e.target.value)}>
                      <option value="">—</option>
                      {["1","2","3","4","5+"].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </Field>
                  <Field label="Floors">
                    <select style={selectStyle} value={form.floors} onChange={(e) => set("floors", e.target.value)}>
                      <option value="">—</option>
                      {["Ground","1st","2nd","3rd","4th","5th+"].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </Field>
                </div>
              )}

              <div style={grid2}>
                <Field label="Furnishing">
                  <select style={selectStyle} value={form.furnishing} onChange={(e) => set("furnishing", e.target.value as any)}>
                    <option value="unfurnished">Unfurnished</option>
                    <option value="semi-furnished">Semi-Furnished</option>
                    <option value="furnished">Fully Furnished</option>
                  </select>
                </Field>
                <Field label="Facing Direction">
                  <select style={selectStyle} value={form.facing} onChange={(e) => set("facing", e.target.value)}>
                    <option value="">Select facing</option>
                    {["North","South","East","West","North-East","North-West","South-East","South-West"].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </Field>
              </div>
            </Card>
          </>
        )}

        {/* ══ STEP 3: Pricing ══ */}
        {step === 3 && (
          <Card title="Pricing Details" subtitle="Set a fair price to attract genuine buyers">
            <Field label="Expected Price" required>
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#888", fontWeight: 600, fontSize: "15px" }}>₹</span>
                  <input
                    style={{ ...inputStyle, paddingLeft: "28px" }}
                    type="number"
                    placeholder="e.g. 8500000"
                    value={form.price}
                    onChange={(e) => set("price", e.target.value)}
                  />
                </div>
                <select style={{ ...selectStyle, width: "140px" }} value={form.priceUnit} onChange={(e) => set("priceUnit", e.target.value as any)}>
                  <option value="total">Total Price</option>
                  <option value="per-month">Per Month</option>
                  <option value="per-sqft">Per Sq.ft</option>
                </select>
              </div>
            </Field>

            {/* Price helper display */}
            {form.price && (
              <div style={{ background: "#f0f6ff", border: "1px solid #b5d4f4", borderRadius: "10px", padding: "14px 16px", marginTop: "-8px", marginBottom: "20px" }}>
                <p style={{ margin: 0, fontSize: "13px", color: "#185FA5", fontWeight: 600 }}>
                  ₹{Number(form.price).toLocaleString("en-IN")}
                  {form.priceUnit === "per-month" ? "/month" : form.priceUnit === "per-sqft" ? "/sq.ft" : " (total)"}
                </p>
                {form.priceUnit === "total" && Number(form.price) >= 100000 && (
                  <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#185FA5" }}>
                    = {Number(form.price) >= 10000000
                        ? `₹${(Number(form.price)/10000000).toFixed(2)} Crore`
                        : `₹${(Number(form.price)/100000).toFixed(2)} Lakh`}
                  </p>
                )}
              </div>
            )}

            <Field label="Price Negotiable?">
              <div style={{ display: "flex", gap: "10px" }}>
                {["Yes", "No"].map((v) => (
                  <button key={v} className="type-pill"
                    style={{ padding: "8px 22px", borderRadius: "10px", border: "2px solid #e8e4dc", background: "#fff", color: "#666", fontSize: "14px" }}>
                    {v}
                  </button>
                ))}
              </div>
            </Field>

            {form.area && form.price && (
              <div style={{ background: "#fdfcfa", border: "1px solid #e8e4dc", borderRadius: "10px", padding: "14px 16px" }}>
                <p style={{ margin: "0 0 4px", fontSize: "12px", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Auto-calculated</p>
                <p style={{ margin: 0, fontSize: "14px", color: "#444" }}>
                  Price per sq.ft: <strong style={{ color: "#D85A30" }}>₹{Math.round(Number(form.price) / Number(form.area)).toLocaleString("en-IN")}</strong>
                </p>
              </div>
            )}
          </Card>
        )}

        {/* ══ STEP 4: Location ══ */}
        {step === 4 && (
          <Card title="Property Location" subtitle="Precise location helps buyers find your property faster">
            <Field label="Area / Locality" required>
              <select style={selectStyle} value={form.location} onChange={(e) => set("location", e.target.value)}>
                <option value="">Select area in Ludhiana</option>
                {AREAS.map((a) => <option key={a} value={a}>{a}, Ludhiana</option>)}
              </select>
            </Field>

            <Field label="Nearby Landmark" hint="e.g. Near DAV School, Opposite Civil Hospital">
              <input
                style={inputStyle}
                placeholder="Enter a nearby landmark..."
                value={form.landmark}
                onChange={(e) => set("landmark", e.target.value)}
              />
            </Field>

            <Field label="Full Address">
              <textarea
                style={{ ...inputStyle, minHeight: "90px", resize: "vertical" }}
                placeholder="House no., street, colony..."
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </Field>

            {/* Map placeholder */}
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e8e4dc", marginTop: "4px" }}>
              <div style={{ background: "#e8f0e8", height: "200px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", color: "#666" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                  <line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
                </svg>
                <p style={{ margin: 0, fontSize: "13px", fontWeight: 500 }}>Map pin — select area above to place pin</p>
                <p style={{ margin: 0, fontSize: "11px", color: "#aaa" }}>Ludhiana, Punjab</p>
              </div>
            </div>
          </Card>
        )}

        {/* ══ STEP 5: Contact ══ */}
        {step === 5 && (
          <>
            <Card title="Your Contact Details" subtitle="Buyers will use these details to reach you">
              <Field label="Your Name" required>
                <input style={inputStyle} placeholder="Full name" value={form.ownerName} onChange={(e) => set("ownerName", e.target.value)} />
              </Field>

              <div style={grid2}>
                <Field label="Phone Number" required>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#888", fontSize: "13px" }}>+91</span>
                    <input style={{ ...inputStyle, paddingLeft: "40px" }} type="tel" maxLength={10} placeholder="10-digit number" value={form.ownerPhone} onChange={(e) => set("ownerPhone", e.target.value)} />
                  </div>
                </Field>
                <Field label="Email (optional)">
                  <input style={inputStyle} type="email" placeholder="your@email.com" value={form.ownerEmail} onChange={(e) => set("ownerEmail", e.target.value)} />
                </Field>
              </div>
            </Card>

            {/* Summary */}
            <Card title="Review Your Listing">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {[
                  { label: "Title", value: form.title || "—" },
                  { label: "Type", value: `${form.listingType} · ${form.propertyType}` },
                  { label: "Price", value: form.price ? `₹${Number(form.price).toLocaleString("en-IN")}` : "—" },
                  { label: "Area", value: form.area ? `${form.area} ${form.areaUnit}` : "—" },
                  { label: "Location", value: form.location || "—" },
                  { label: "Photos", value: `${images.length} uploaded` },
                ].map((r) => (
                  <div key={r.label} style={{ background: "#fdfcfa", border: "1px solid #f0ede8", borderRadius: "8px", padding: "10px 14px" }}>
                    <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{r.label}</p>
                    <p style={{ fontSize: "13px", color: "#111", fontWeight: 600, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.value}</p>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* ── Nav Buttons ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "11px 22px", background: "#fff", border: "1.5px solid #e8e4dc", borderRadius: "10px", color: "#555", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "11px 28px", background: "#D85A30", color: "#fff", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}
            >
              Continue
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!form.ownerName || !form.ownerPhone}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "13px 32px", background: (!form.ownerName || !form.ownerPhone) ? "#ccc" : "#1D9E75",
                color: "#fff", border: "none", borderRadius: "10px",
                fontWeight: 700, fontSize: "15px",
                cursor: (!form.ownerName || !form.ownerPhone) ? "not-allowed" : "pointer",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Submit Listing
            </button>
          )}
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#bbb", marginTop: "16px" }}>
          100% Free · No hidden charges · Live within 24 hours
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SellProperty;