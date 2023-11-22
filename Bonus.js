//part 1
const fs = require('fs');
const csv = require('csv-parser');

const path = '/Users/abderrahmanetsouli/Downloads/archive/results.csv';
const hostCountries = {};

fs.createReadStream(path)
  .pipe(csv())
  .on('data', ({ country, neutral }) => {
    //part 2
    if(neutral == 'TRUE'){
      hostCountries[country] = (hostCountries[country] || 0) + 1;
    }
   
  })
  .on('end', () => {
    //part 3
   const mostHostedCountry = Object.keys(hostCountries).reduce((a,b) => hostCountries[a] > hostCountries[b] ? a : b);
   console.log(`The country that has hosted the most matches is : ${mostHostedCountry}`);
  });
