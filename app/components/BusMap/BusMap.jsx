"use client";

import dynamic from "next/dynamic";
import busesData from "../../data/buses.json";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false });

export default function BusMap({ selectedBusId }) {
  const busLines = busesData.bus_lines;
  const selectedBus = busLines.find((bus) => bus.id === selectedBusId);

  const busIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/422/422962.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const stopIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.freepik.com/512/4287/4287661.png",
    iconSize: [20, 20],
    iconAnchor: [10, 20],
  });

  return (
    <div style={{ height: "500px", width: "100%" }}>
      {typeof window !== "undefined" && (
        <MapContainer
          center={[3.139, 101.6869]} // default center
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {selectedBus && (
            <>
              {/* Bus current location */}
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
                  Capacity: {selectedBus.passengers.current} / {selectedBus.passengers.capacity} (
                  {selectedBus.passengers.utilization_percentage}%)
                  <br />
                  Next Stop:{" "}
                  {selectedBus.bus_stops.find((stop) => stop.is_next_stop)?.name || "N/A"}
                </Popup>
              </Marker>

              {/* Bus stops */}
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

              {/* Route polyline */}
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
  );
}
