const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var curYear = new Date().getFullYear()




function DisplayArray(array){
  console.log('Zawartość tablicy:');
  for(i of array){
    console.log(i);
  }
}

function Dividors(num) {
  console.log('Dzielniki liczby: ', num);
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      console.log(i);
    }
  }
}



const array = [1, 2, 3, 4, 5, 6];
var num = 2.34;
const text = "TEXT";

DisplayArray(array);
Dividors(100);


rl.question(`W którym roku się urodziłeś/aś? `, year => {
   if (isNaN(year)) {
    console.log('To nie jest poprawny rok.');
  } else if (year > curYear) {
    console.log('Kłamiesz!');
  } else {
    console.log('Masz: ', curYear - year,' lat');
  }
  rl.close();
});




