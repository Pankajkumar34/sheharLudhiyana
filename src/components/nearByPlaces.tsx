import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet Marker Icon Fix
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

// Map Component to dynamically re-center on place selection
function ChangeMapView({ coords }: { coords: [number, number] }) {
  const map = useMap();
  map.setView(coords, 14);
  return null;
}

export default function InteractiveMapSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    30.901, 75.8573, // Default Location (Ludhiana/Punjab)
  ]);
  const [selectedName, setSelectedName] = useState<string>("Default Location");

  // Handle live search for State, City, Sector, Market
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 3) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          value
        )}&countrycodes=in&limit=5`
      );
      const data: SearchResult[] = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  // Select place from dropdown
  const handleSelectPlace = (place: SearchResult) => {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);

    setSelectedPosition([lat, lon]);
    setSelectedName(place.display_name);
    setResults([]);
    setQuery(place.display_name.split(",")[0]); // Set concise name in search box
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      {/* Search Input Box */}
      <div className="relative">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Search City, Sector, Market, or State:
        </label>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="e.g. Sector 17 Chandigarh, Sarabha Nagar Ludhiana..."
          className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
        />

        {/* Autocomplete Dropdown */}
        {results.length > 0 && (
          <ul className="absolute z-[1000] left-0 right-0 bg-white border rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto text-sm divide-y">
            {results.map((item) => (
              <li
                key={item.place_id}
                onClick={() => handleSelectPlace(item)}
                className="p-3 hover:bg-orange-50 cursor-pointer text-gray-700 transition"
              >
                📍 {item.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Map View Box */}
      <div className="h-[450px] w-full rounded-xl overflow-hidden border shadow-md relative">
        <MapContainer
          center={selectedPosition}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <ChangeMapView coords={selectedPosition} />
          
          {/* TileLayer loads visual maps with all Sectors, Roads, Markets */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={selectedPosition} icon={customIcon}>
            <Popup>{selectedName}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}