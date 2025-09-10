import "./BusSchedule.css";

function BusSchedule() {
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
          <tr className="highlight">
            <td>Amphi Stop</td>
            <td>14:42</td>
          </tr>
          <tr>
            <td>Palsa Stop</td>
            <td>15:21</td>
          </tr>
          <tr>
            <td>Tutu Stop</td>
            <td>16:20</td>
          </tr>
          <tr>
            <td>Acari Stop</td>
            <td>17:10</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BusSchedule;
