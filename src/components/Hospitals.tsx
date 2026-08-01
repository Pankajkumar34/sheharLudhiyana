import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, MapPin, Phone, Star, ChevronDown, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Types ─────────────────────────────────────────────────────────────────────

type ViewTab = "hospitals" | "speciality" | "doctors";

// ── Data ─────────────────────────────────────────────────────────────────────

const specialities = [
  "All Specialities",
  "Cardiology",
  "Orthopaedics",
  "Neurology",
  "Gynaecology",
  "Paediatrics",
  "Oncology",
  "Dermatology",
  "Ophthalmology",
  "ENT",
  "Urology",
  "Gastroenterology",
];

const hospitals = [
  {
    id: 1,
    name: "Dayanand Medical College & Hospital",
    shortName: "DMC&H",
    address: "Tagore Nagar, Civil Lines, Ludhiana",
    phone: "+91-161-2302311",
    rating: 4.6,
    reviews: 2840,
    type: "Government-Aided",
    beds: 1500,
    established: 1953,
    specialities: ["Cardiology", "Neurology", "Oncology", "Orthopaedics", "Gynaecology", "Paediatrics"],
    doctors: [
      { name: "Dr. Rajesh Sharma", speciality: "Cardiology", experience: "22 yrs", available: true },
      { name: "Dr. Priya Malhotra", speciality: "Neurology", experience: "18 yrs", available: true },
      { name: "Dr. Suresh Verma", speciality: "Oncology", experience: "15 yrs", available: false },
    ],
    emergency: true,
    color: "#1a73e8",
  },
  {
    id: 2,
    name: "Christian Medical College & Hospital",
    shortName: "CMC",
    address: "Brown Road, Ludhiana",
    phone: "+91-161-2420441",
    rating: 4.8,
    reviews: 3120,
    type: "Private",
    beds: 2000,
    established: 1894,
    specialities: ["Cardiology", "Orthopaedics", "Gynaecology", "Paediatrics", "Urology", "ENT"],
    doctors: [
      { name: "Dr. Anil Kapoor", speciality: "Orthopaedics", experience: "25 yrs", available: true },
      { name: "Dr. Sunita Gill", speciality: "Gynaecology", experience: "20 yrs", available: true },
      { name: "Dr. Rohit Mehra", speciality: "Urology", experience: "12 yrs", available: true },
    ],
    emergency: true,
    color: "#0d9e6e",
  },
  {
    id: 3,
    name: "SPS Hospitals",
    shortName: "SPS",
    address: "Sherpur Chowk, GT Road, Ludhiana",
    phone: "+91-161-5060000",
    rating: 4.4,
    reviews: 1560,
    type: "Private",
    beds: 600,
    established: 2005,
    specialities: ["Cardiology", "Gastroenterology", "Dermatology", "ENT", "Ophthalmology"],
    doctors: [
      { name: "Dr. Mandeep Singh", speciality: "Cardiology", experience: "16 yrs", available: true },
      { name: "Dr. Kavita Arora", speciality: "Dermatology", experience: "10 yrs", available: false },
      { name: "Dr. Harjit Bhatia", speciality: "Gastroenterology", experience: "14 yrs", available: true },
    ],
    emergency: true,
    color: "#e8612c",
  },
  {
    id: 4,
    name: "Fortis Hospital Ludhiana",
    shortName: "Fortis",
    address: "Chandigarh Road, Ludhiana",
    phone: "+91-161-5222222",
    rating: 4.7,
    reviews: 2100,
    type: "Private",
    beds: 400,
    established: 2012,
    specialities: ["Cardiology", "Neurology", "Oncology", "Orthopaedics", "Urology"],
    doctors: [
      { name: "Dr. Vivek Tandon", speciality: "Neurology", experience: "19 yrs", available: true },
      { name: "Dr. Puja Sharma", speciality: "Oncology", experience: "11 yrs", available: true },
      { name: "Dr. Deepak Anand", speciality: "Cardiology", experience: "17 yrs", available: false },
    ],
    emergency: true,
    color: "#7c3aed",
  },
  {
    id: 5,
    name: "Guru Nanak Dev Hospital",
    shortName: "GNDH",
    address: "Ferozepur Road, Ludhiana",
    phone: "+91-161-2440330",
    rating: 4.1,
    reviews: 980,
    type: "Government",
    beds: 1200,
    established: 1968,
    specialities: ["Gynaecology", "Paediatrics", "ENT", "Ophthalmology", "Dermatology"],
    doctors: [
      { name: "Dr. Harpreet Kaur", speciality: "Gynaecology", experience: "20 yrs", available: true },
      { name: "Dr. Paramjit Singh", speciality: "Paediatrics", experience: "14 yrs", available: true },
      { name: "Dr. Sarbjit Gill", speciality: "ENT", experience: "9 yrs", available: false },
    ],
    emergency: true,
    color: "#d97706",
  },
  {
    id: 6,
    name: "Ivy Hospital Ludhiana",
    shortName: "Ivy",
    address: "GT Road, Near Sherpur, Ludhiana",
    phone: "+91-161-4666000",
    rating: 4.5,
    reviews: 1340,
    type: "Private",
    beds: 350,
    established: 2010,
    specialities: ["Orthopaedics", "Neurology", "Urology", "Gastroenterology"],
    doctors: [
      { name: "Dr. Nitin Gupta", speciality: "Orthopaedics", experience: "13 yrs", available: true },
      { name: "Dr. Renu Bala", speciality: "Gastroenterology", experience: "11 yrs", available: true },
      { name: "Dr. Amit Rana", speciality: "Neurology", experience: "8 yrs", available: true },
    ],
    emergency: false,
    color: "#0891b2",
  },
];

// Flat list of all doctors across all hospitals
const allDoctors = hospitals.flatMap((h) =>
  h.doctors.map((d) => ({ ...d, hospital: h.name, hospitalId: h.id, hospitalColor: h.color }))
);

// ── Speciality icons map ──────────────────────────────────────────────────────

const specialityIcons: Record<string, string> = {
  Cardiology: "❤️",
  Orthopaedics: "🦴",
  Neurology: "🧠",
  Gynaecology: "🌸",
  Paediatrics: "👶",
  Oncology: "🔬",
  Dermatology: "✨",
  Ophthalmology: "👁️",
  ENT: "👂",
  Urology: "💊",
  Gastroenterology: "🫀",
  "All Specialities": "🏥",
};

// ── Main Page ─────────────────────────────────────────────────────────────────

const Hospitals = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<ViewTab>("hospitals");
  const [search, setSearch] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("All Specialities");
  const [selectedType, setSelectedType] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Sync tab from URL query param
  useEffect(() => {
    const view = searchParams.get("view");
    if (view === "speciality") setActiveTab("speciality");
    else if (view === "doctors") setActiveTab("doctors");
    else setActiveTab("hospitals");
  }, [searchParams]);

  // ── Filtered data ────────────────────────────────────────────────────────

  const filteredHospitals = hospitals.filter((h) => {
    const matchSearch = !search ||
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.address.toLowerCase().includes(search.toLowerCase()) ||
      h.specialities.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchSpeciality = selectedSpeciality === "All Specialities" || h.specialities.includes(selectedSpeciality);
    const matchType = selectedType === "All" || h.type === selectedType;
    return matchSearch && matchSpeciality && matchType;
  });

  const filteredDoctors = allDoctors.filter((d) => {
    const matchSearch = !search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.speciality.toLowerCase().includes(search.toLowerCase()) ||
      d.hospital.toLowerCase().includes(search.toLowerCase());
    const matchSpeciality = selectedSpeciality === "All Specialities" || d.speciality === selectedSpeciality;
    return matchSearch && matchSpeciality;
  });

  const hasActiveFilters = selectedSpeciality !== "All Specialities" || selectedType !== "All" || search !== "";

  const clearFilters = () => {
    setSelectedSpeciality("All Specialities");
    setSelectedType("All");
    setSearch("");
  };

  // ── Sidebar ──────────────────────────────────────────────────────────────

  const FilterContent = () => (
    <>
      <h3 className="font-bold text-gray-900 mb-4 text-sm">Speciality</h3>
      <div className="space-y-1.5">
        {specialities.map((s) => (
          <label key={s} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <input
              type="radio"
              name="speciality"
              checked={selectedSpeciality === s}
              onChange={() => setSelectedSpeciality(s)}
              className="accent-blue-600"
            />
            <span className="text-base leading-none">{specialityIcons[s] ?? "🏥"}</span>
            {s}
          </label>
        ))}
      </div>

      {activeTab === "hospitals" && (
        <div className="border-t border-gray-100 mt-5 pt-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Hospital Type</h4>
          <div className="space-y-1.5">
            {["All", "Private", "Government", "Government-Aided"].map((t) => (
              <label key={t} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <input
                  type="radio"
                  name="type"
                  checked={selectedType === t}
                  onChange={() => setSelectedType(t)}
                  className="accent-blue-600"
                />
                {t === "All" ? "All Types" : t}
              </label>
            ))}
          </div>
        </div>
      )}

      <Button variant="outline" className="w-full mt-5 text-sm" onClick={clearFilters}>
        Clear Filters
      </Button>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-8 sm:py-12">
        <div className="container px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🏥</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Hospitals in Ludhiana</h1>
          </div>
          <p className="text-gray-500 mb-6 text-sm sm:text-base ml-12">
            Find hospitals, specialities & doctors in the Manchester of India
          </p>

          {/* Search */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-3xl">
            <div className="flex-1 flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder={
                  activeTab === "doctors"
                    ? "Search doctors by name, speciality, hospital..."
                    : "Search hospitals, specialities, areas..."
                }
                className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2 w-full sm:w-auto text-sm">
              <Search className="w-3.5 h-3.5" /> Search
            </Button>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-2 mt-5 flex-wrap">
            {(
              [
                { key: "hospitals", label: "🏥 All Hospitals" },
                { key: "speciality", label: "⚕️ By Speciality" },
                { key: "doctors", label: "👨‍⚕️ Find a Doctor" },
              ] as { key: ViewTab; label: string }[]
            ).map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                  activeTab === t.key
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="container px-4 sm:px-6 py-6 sm:py-8">

        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <button
            onClick={() => setFiltersOpen((p) => !p)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={15} height={15}>
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            Filters
            {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-blue-600" />}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
          </button>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800">
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>

        {filtersOpen && (
          <div className="lg:hidden bg-white border border-gray-200 rounded-xl p-4 mb-5">
            <FilterContent />
          </div>
        )}

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white border border-gray-100 rounded-xl p-4 sticky top-24">
              <FilterContent />
            </div>
          </aside>

          <main className="flex-1 min-w-0">

            {/* ── HOSPITALS TAB ─────────────────────────────────────────── */}
            {activeTab === "hospitals" && (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  Showing {filteredHospitals.length} hospital{filteredHospitals.length !== 1 ? "s" : ""}
                </p>
                {filteredHospitals.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                    <span className="text-5xl">🏥</span>
                    <p className="text-gray-500 mt-3">No hospitals found. Try adjusting your filters.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {filteredHospitals.map((h) => (
                      <div key={h.id} className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                        {/* Header */}
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                            style={{ background: h.color }}
                          >
                            {h.shortName.slice(0, 3)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-bold text-gray-900 text-sm leading-snug">{h.name}</h3>
                              {h.emergency && (
                                <span className="shrink-0 text-xs bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded-full font-medium">
                                  24/7 Emergency
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                              <span className="text-sm font-medium text-gray-800">{h.rating}</span>
                              <span className="text-xs text-gray-400">({h.reviews.toLocaleString()} reviews)</span>
                            </div>
                          </div>
                        </div>

                        {/* Info row */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {h.address}</span>
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {h.phone}</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {h.beds} beds</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            h.type === "Government" ? "bg-green-50 text-green-700" :
                            h.type === "Government-Aided" ? "bg-blue-50 text-blue-700" :
                            "bg-orange-50 text-orange-700"
                          }`}>{h.type}</span>
                        </div>

                        {/* Specialities */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {h.specialities.map((s) => (
                            <button
                              key={s}
                              onClick={() => { setSelectedSpeciality(s); }}
                              className="text-xs px-2.5 py-1 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 text-gray-600 rounded-full border border-gray-100 transition-colors"
                            >
                              {specialityIcons[s]} {s}
                            </button>
                          ))}
                        </div>

                        {/* Doctors preview */}
                        <div className="border-t border-gray-100 pt-3">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Doctors Available</p>
                          <div className="space-y-1.5">
                            {h.doctors.map((d) => (
                              <div key={d.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">👨‍⚕️</div>
                                  <div>
                                    <p className="text-xs font-medium text-gray-800">{d.name}</p>
                                    <p className="text-xs text-gray-400">{d.speciality} · {d.experience}</p>
                                  </div>
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                  d.available ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-400"
                                }`}>
                                  {d.available ? "Available" : "Busy"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* <Button
                          size="sm"
                          variant="outline"
                          className="w-full mt-3 text-xs border-gray-200 hover:border-blue-300 hover:text-blue-600"
                          onClick={() => navigate(`/hospitals/${h.id}`)}
                        >
                          View Hospital Details →
                        </Button> */}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ── SPECIALITY TAB ─────────────────────────────────────────── */}
            {activeTab === "speciality" && (
              <>
                <p className="text-sm text-gray-500 mb-4">Browse hospitals by medical speciality</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                  {specialities.filter((s) => s !== "All Specialities").map((s) => {
                    const count = hospitals.filter((h) => h.specialities.includes(s)).length;
                    return (
                      <button
                        key={s}
                        onClick={() => { setSelectedSpeciality(s); setActiveTab("hospitals"); }}
                        className={`bg-white border rounded-xl p-4 text-center hover:shadow-md transition-all hover:border-blue-200 ${
                          selectedSpeciality === s ? "border-blue-400 bg-blue-50" : "border-gray-100"
                        }`}
                      >
                        <div className="text-3xl mb-2">{specialityIcons[s]}</div>
                        <p className="text-sm font-semibold text-gray-800">{s}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{count} hospital{count !== 1 ? "s" : ""}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Show hospitals for selected speciality */}
                {selectedSpeciality !== "All Specialities" && (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">{specialityIcons[selectedSpeciality]}</span>
                      <h2 className="text-lg font-bold text-gray-900">{selectedSpeciality} Hospitals</h2>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      {hospitals.filter((h) => h.specialities.includes(selectedSpeciality)).map((h) => (
                        <div key={h.id} className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: h.color }}>
                              {h.shortName.slice(0, 3)}
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-sm">{h.name}</h3>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                <span className="text-xs text-gray-600">{h.rating} · {h.type}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                            <MapPin className="w-3 h-3" /> {h.address}
                          </p>
                          {/* Doctors in this speciality */}
                          {h.doctors.filter((d) => d.speciality === selectedSpeciality).map((d) => (
                            <div key={d.name} className="flex items-center justify-between py-1.5 border-t border-gray-50">
                              <div className="flex items-center gap-2">
                                <span className="text-base">👨‍⚕️</span>
                                <div>
                                  <p className="text-xs font-medium text-gray-800">{d.name}</p>
                                  <p className="text-xs text-gray-400">{d.experience} experience</p>
                                </div>
                              </div>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${d.available ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-400"}`}>
                                {d.available ? "Available" : "Busy"}
                              </span>
                            </div>
                          ))}
                          {/* <Button size="sm" variant="outline" className="w-full mt-3 text-xs" onClick={() => navigate(`/hospitals/${h.id}`)}>
                            View Hospital →
                          </Button> */}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {/* ── DOCTORS TAB ────────────────────────────────────────────── */}
            {activeTab === "doctors" && (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""}
                </p>
                {filteredDoctors.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                    <span className="text-5xl">👨‍⚕️</span>
                    <p className="text-gray-500 mt-3">No doctors found. Try adjusting your search.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredDoctors.map((d, i) => (
                      <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0"
                            style={{ background: `${d.hospitalColor}15` }}
                          >
                            👨‍⚕️
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <h3 className="font-bold text-gray-900 text-sm truncate">{d.name}</h3>
                              <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                                d.available ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-400"
                              }`}>
                                {d.available ? "Available" : "Busy"}
                              </span>
                            </div>
                            <p className="text-xs font-medium mt-0.5" style={{ color: d.hospitalColor }}>
                              {specialityIcons[d.speciality]} {d.speciality}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">{d.experience} experience</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-50">
                          <button
                            onClick={() => navigate(`/hospitals/${d.hospitalId}`)}
                            className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                          >
                            <span className="text-sm">🏥</span>
                            <span className="truncate">{d.hospital}</span>
                          </button>
                        </div>
                        {/* <Button
                          size="sm"
                          className="w-full mt-3 text-xs bg-blue-600 hover:bg-blue-700"
                          onClick={() => navigate(`/hospitals/${d.hospitalId}`)}
                        >
                          View Hospital Profile
                        </Button> */}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Hospitals;