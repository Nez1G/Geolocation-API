const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyABjXFwpBmCJtKQYod7a6GuTXQB5EkjYVk',
  Promise: Promise
});
 
  googleMapsClient.reverseGeocode({
    latlng: [41.605205,-8.469511],
  })
  .asPromise()
  .then((response) => {
    console.log(response.json.results[0].formatted_address);
  });
  