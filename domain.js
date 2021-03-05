import {config, googleApi} from './config.js'
import { Loader } from "@googlemaps/js-api-loader"
//select all elements needed
const submitButton = document.querySelector('#sub');
const clearButton = document.querySelector('#clear');
const display = document.querySelector('#displayResults');
const input = document.querySelector('#inputId');
const mykey = config.MY_KEY;
let map;


const loader = new Loader({
    apiKey: googleApi,
    version: "weekly",
   
  });
  loader.load().then(() => {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  });

//grab the data you need to display results
function domainData(data){
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://domain-checker7.p.rapidapi.com/api/v2.0/domain",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "x-rapidapi-key": `${mykey}`,
            "x-rapidapi-host": "domain-checker7.p.rapidapi.com"
        },
        "data": {
            "domain": `${data}`
        }
    };
    
   const newData =  $.ajax(settings).done(function (response) {
        return response
    });
    return newData
}
domainData('google.com')

//display those results onto the page
function html(data){
    const markUp = `
   <h3>Domain: ${data.domain}</h3>
   <h3>Available: ${data.available}</h3>
   <h3>Created: ${data.created_at}</h3>
   <h3>Expires: ${data.expires_at}</h3>
   <h3>Registrar: ${data.registrar}</h3>
    `
    return markUp;
}
function clear(){
    display.innerHTML = '';
    input.value = '';
    console.log('data cleared');
}
//when the clear button is clicked clear the input
//when submit button is clicked get the value of the users input and attach to the query
submitButton.addEventListener('click', async function(e){
    e.preventDefault();
    const value = input.value;
    const data = await domainData(value)
    console.log(data)
    display.innerHTML = html(data)
},{
    once : false
  })

  clearButton.addEventListener('click', clear,{
      once: false
  });