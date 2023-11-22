// part 1 : import the necessary files
const fs = require('fs');
const csvParser = require('csv-parser');

const path = '/Users/abderrahmanetsouli/Desktop/corma/archive/goalscorers.csv';
const res = [];

fs.createReadStream(path)
  .pipe(csvParser())
  .on('data', (line) => {
    //part 2 : treatment of the problem
  const existingPlayer = res.find(player => player.name == line.scorer);

  if(!existingPlayer){
    res.push({name: line.scorer,goal: 1})
  }else{
    existingPlayer.goal +=1;
  }
   
  })
  .on('end', () => {
    //part 3 : the result
    const bestPlayer = res.reduce((a,b) => (a.goal > b.goal ? a : b),{goal: 0});
    console.log("The best scorer of all time is : ",bestPlayer);
  });
