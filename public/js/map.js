
// let mapToken = mapToken; 
//console.log(mapToken);
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: "mapbox://styles/mapbox/streets-v12",//style URL
    // center: [90.4152, 23.8041], // starting position [lng, lat]
    center: listing.geometry.coordinates,
    zoom: 9 // starting zoom
});

//console.log(coordinates);

// Create a default Marker and add it to the map.
const marker = new mapboxgl.Marker({ color: 'red'})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25})
    .setHTML(
        `<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`
        )
    )
    .addTo(map);