import { useState, useEffect } from 'react';
import Map from './components/map';
import Loader from './components/Loader';
import Header from './components/Header';

function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(""); // <-- DATE STATE

  // ---- FETCH NASA DATA ----
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);

      const res = await fetch(
        "https://eonet.gsfc.nasa.gov/api/v2.1/events?status=open"
      );

      const { events } = await res.json();
      setEventData(events);

      setLoading(false);
    };

    fetchEvents();
  }, []);

  // ---- FILTER EVENTS BY DATE ----
  const filteredEvents = selectedDate
    ? eventData.filter(ev => {
        const evDate = ev.geometries?.[0]?.date
          ? new Date(ev.geometries[0].date).toISOString().split("T")[0]
          : null;
        return evDate === selectedDate;
      })
    : [];

  return (
    <div>
      <Header />
      {loading ? (
        <div className="page-loader-overlay">
          <Loader />
        </div>
      ) : (
        <Map
          eventData={filteredEvents}
          selectedDate={selectedDate}
          onChangeDate={setSelectedDate}
        />
      )}
    </div>
  );
}

export default App;
