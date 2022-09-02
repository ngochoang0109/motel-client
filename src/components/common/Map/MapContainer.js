import './Map.css';
import GoogleMapReact from 'google-map-react';
import { storageKey } from '../../../constant/storageKey';
import { useEffect } from 'react';
import { AddressApiService } from '../../../service/AddressApiService';

const MapContainer = ({ location, zoomLevel, address }) => {

	useEffect(() => {
		if(address.length!==0){
			AddressApiService.getLocationFromAddress(address)
				.then((data)=>{
					console.log(data)
				})
		}
	}, [address])

	const renderMarkers = (map, maps) => {
		let marker = new maps.Marker({
			position: { lat: location.lat, lng: location.lng },
			map: map,
			title: 'User location'
		});
		return marker;
	};
	const loadMap = () => {
		return (<GoogleMapReact
			bootstrapURLKeys={{ key: storageKey.BootstrapURLKeys }}
			zoom={zoomLevel}
			center={{ lat: location.lat, lng: location.lng }}
			onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
			yesIWantToUseGoogleMapApiInternals
		// onClick={handlerSelectLocation}
		>
		</GoogleMapReact>);
	}

	return (
		<div className="map">
			<div className="google-map">
				{loadMap()}
			</div>
		</div>
	)

}

export default MapContainer;