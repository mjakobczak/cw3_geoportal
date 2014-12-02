var isInAddMarkerMode = false;
var isInAddAnnotationMode = false;
var map;
var markers = L.layerGroup();
var popups = L.layerGroup();

window.onload = function() {
	map = L.map('map');
	revertRange();
	map.closePopupOnClick = false;
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	// var marker = L.marker([51.595519, 18.730165]).addTo(map);
	var circle = L.circle([51.595519, 18.730165], 100, {
		color : 'red',
		fillColor : '#f03',
		fillOpacity : 0.3
	}).addTo(map);

	map.on('click', onMapClick);

	function onMapClick(e) {
		if (isInAddMarkerMode) {
			var marker = L.marker([51.595519, 18.730165]);
			// marker.bindPopup(e.latlng.toString()).openPopup();
			marker.setLatLng(e.latlng);
			markers.addLayer(marker);
			markers.addTo(map);
			isInAddMarkerMode = false;
		}
		if (isInAddAnnotationMode) {
			console.log("Adding annotation at: " + e.latlng);
			var annotationText = prompt("Podaj tekst adnotacji: ");
			//
			// var popup = L.popup();
			// popup.setLatLng(e.latlng).setContent(annotationText);
			// popup.addTo(popups);
			// map.addLayer(popups);
			// // popup.addTo(popups);
			// // map.addLayer(popup);

			var popup = L.popup();
			popup.keepInView = true;
			popup.closeOnClick = false;
			popup.autoPan = false;
			popup.setLatLng(e.latlng).setContent(annotationText);
			popup.addTo(popups);
			popups.addTo(map);

			isInAddAnnotationMode = false;
		}
	}

};

function removeMarker() {
	markers.clearLayers();
}

function removeAnnotation() {
	popups.clearLayers();
}

function revertRange() {
	console.log("Revert range!");
	map.setView([51.595519, 18.730165], 14);
}
