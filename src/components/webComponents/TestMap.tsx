import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function TestMap() {
  return (
    <MapContainer
      center={[30.413452, 76.782593]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[30.413452, 76.782593]} />
    </MapContainer>
  );
}