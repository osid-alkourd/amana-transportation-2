import busesData from "../../data/buses.json";
import "./BusSchedule.css";

function BusSchedule({ selectedBusId }) {
  const busLines = busesData.bus_lines;

  // If no bus is selected, show ALL stops from ALL buses
  if (!selectedBusId) {
    const allStops = busLines.flatMap((bus) =>
      bus.bus_stops.map((stop) => ({
        ...stop,
        busName: bus.name,
        routeNumber: bus.route_number,
      }))
    );

    return (
      <div className="bus-schedule">
        <table>
          <thead>
            <tr>
              <th>Bus</th>
              <th>Route</th>
              <th>Bus Stop</th>
              <th>Next Time of Arrival</th>
            </tr>
          </thead>
          <tbody>
            {allStops.map((stop) => (
              <tr key={`${stop.busName}-${stop.id}`}>
                <td>{stop.busName}</td>
                <td>{stop.routeNumber}</td>
                <td>{stop.name}</td>
                <td>{stop.estimated_arrival}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // If a bus is selected, show ONLY that bus’s stops and highlight next stop
  const selectedBus = busLines.find((bus) => bus.id === selectedBusId);

  if (!selectedBus) return null;

  return (
    <div className="bus-schedule">
      <table>
        <thead>
          <tr>
            <th>Bus Stop</th>
            <th>Next Time of Arrival</th>
          </tr>
        </thead>
        <tbody>
          {selectedBus.bus_stops.map((stop) => (
            <tr
              key={stop.id}
              className={stop.is_next_stop ? "highlight" : ""}
            >
              <td>{stop.name}</td>
              <td>{stop.estimated_arrival}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BusSchedule;
