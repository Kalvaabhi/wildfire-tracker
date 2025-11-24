const LocationInfoBox = ({ info }) => {
  const eventDate = info.geometries?.[0]?.date
    ? new Date(info.geometries[0].date).toLocaleString()
    : "No date available";

  return (
    <div className="location-info">
      <h2>Event Information</h2>
      <p><strong>ID:</strong> {info.id}</p>
      <p><strong>PLACE:</strong> {info.title}</p>
      <p><strong>DATE:</strong> {eventDate}</p>
    </div>
  );
};

export default LocationInfoBox;
