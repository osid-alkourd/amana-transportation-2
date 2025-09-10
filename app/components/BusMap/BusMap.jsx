"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import busesData from "../../data/buses.json"; // استدعاء البيانات المحلية
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// dynamic imports حتى نتجنب window is not defined
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);

export default function BusMap() {
  const [selectedBusId, setSelectedBusId] = useState(null);
  const busLines = busesData.bus_lines;

  const busIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61212.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const stopIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854894.png",
    iconSize: [20, 20],
    iconAnchor: [10, 20],
  });

  const selectedBus = busLines.find((bus) => bus.id === selectedBusId);

  return (
    <div style={{ width: "100%" }}>
      {/* أزرار لاختيار الباص */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "10px" }}>
        {busLines.map((bus) => (
          <button
            key={bus.id}
            onClick={() => setSelectedBusId(bus.id)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: selectedBusId === bus.id ? "#0070f3" : "#f5f5f5",
              color: selectedBusId === bus.id ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {bus.route_number} - {bus.name}
          </button>
        ))}
      </div>

      {/* الخريطة */}
      <div style={{ height: "500px", width: "100%" }}>
        {typeof window !== "undefined" && (
          <MapContainer
            center={[3.139, 101.6869]} // Kuala Lumpur
            zoom={12}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {selectedBus && (
              <>
                {/* موقع الباص */}
                <Marker
                  position={[
                    selectedBus.current_location.latitude,
                    selectedBus.current_location.longitude,
                  ]}
                  icon={busIcon}
                >
                  <Popup>
                    <b>{selectedBus.name}</b> ({selectedBus.route_number})
                    <br />
                    Driver: {selectedBus.driver.name}
                    <br />
                    Status: {selectedBus.status}
                    <br />
                    Location: {selectedBus.current_location.address}
                  </Popup>
                </Marker>

                {/* المحطات */}
                {selectedBus.bus_stops.map((stop) => (
                  <Marker
                    key={stop.id}
                    position={[stop.latitude, stop.longitude]}
                    icon={stopIcon}
                  >
                    <Popup>
                      <b>{stop.name}</b> <br />
                      ETA: {stop.estimated_arrival}
                    </Popup>
                  </Marker>
                ))}

                {/* خط المسار */}
                <Polyline
                  positions={selectedBus.bus_stops.map((s) => [
                    s.latitude,
                    s.longitude,
                  ])}
                  color="blue"
                />
              </>
            )}
          </MapContainer>
        )}
      </div>
    </div>
  );
}
