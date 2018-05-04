const fetch = require('node-fetch')
const express = require('express');
var cors = require('cors');
const url = require('url');
const app = express();
const router = express.Router();
const port = 3000;
var localizacaoAtual, matrix;

   
// url: http://localhost:3000/
app.get('/', (request, response) => response.send('Use /location?lat=X&lon=Y to find your current location'));

app.use('/location', router);
router.use(cors({origin: '*'}));

router.get('/', (request, response) => {
  var urlParts = url.parse(request.url, true);
  var parameters = urlParts.query;
  var lat = parameters.lat;
  var lon = parameters.lon;
  var myResponse = 0;
  var localizacao, origins, localizacaoURL;
  
  fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&key=AIzaSyD8loXIrO1O1stBVB8xbeppPjE5aG5ERh8')
  .then((response) => response.json())
  .then(result => {
    localizacaoAtual = result.results[0].formatted_address;
    localizacao = result.results[0].formatted_address;
    localizacaoURL = localizacao.replace(/ /g,"+");
    origins = cleanUpSpecialChars(localizacaoURL);
    localizacaoAtual = cleanUpSpecialChars(localizacao);
    fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+origins+'&destinations='+lat+','+lon+'&key=AIzaSyABjXFwpBmCJtKQYod7a6GuTXQB5EkjYVk')
      .then((response) => response.json())
      .then(result => {
         matrix = result.rows[0].elements[0].distance.text
        response.json({location : localizacaoAtual, distancematrix : result.rows[0].elements[0].distance.text});
      })
      .catch(function(error) {
        console.log(error);
    });
    })
  .catch(function(error) {
    console.log(error);
  });
});

app.get('/result', (request, response) => {
  response.json({location : localizacaoAtual, distancematrix : matrix});
});

function cleanUpSpecialChars(str)
{
    str = str.replace(/[ÀÁÂÃÄÅ]/g,"A");
    str = str.replace(/[àáâãäå]/g,"a");
    str = str.replace(/[ÈÉÊË]/g,"E");
    str = str.replace(/[èéê]/g,"e");
    str = str.replace(/[ÌÍÎ]/g,"I");
    str = str.replace(/[ìíî]/g,"i");
    str = str.replace(/[ÒÓÔÕ]/g,"O");
    str = str.replace(/[òóôõ]/g,"o");
    str = str.replace(/[ÙÚÛ]/g,"U");
    str = str.replace(/[ùúû]/g,"u");
    str = str.replace(/[Ç]/g,"C");
    str = str.replace(/[ç]/g,"c");
    str = str.replace(/[Ñ]/g,"N");
    str = str.replace(/[ñ]/g,"n");
    return str.replace(/[^a-zA-Z0-9+%\-.,]/i,'');
}

// set the server to listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));
