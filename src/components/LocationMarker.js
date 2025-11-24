import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/fire-alert'

const LocationMarker = ({ lat, lng, onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (typeof onClick === 'function') onClick();
  };
  return (
    <div className='location-marker' onClick={handleClick}>
      <Icon icon={locationIcon} className='location-icon'/>
    </div>
  )
}

export default LocationMarker;
