"use client";

import busesData from "../../data/buses.json";
import "./BusSelector.css";

function BusSelector({ selectedBusId, onSelectBus }) {
  const busLines = busesData.bus_lines;

  return (
    <div className="bus-selector">
      {busLines.map((bus) => (
        <button
          key={bus.id}
          className={selectedBusId === bus.id ? "active" : ""}
          onClick={() => onSelectBus(bus.id)}
        >
          Bus {bus.id}
        </button>
      ))}
    </div>
  );
}

export default BusSelector;
