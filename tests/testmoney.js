import { currencyfunc } from "../utils/money.js";


console.log('testing case : currencyFunction');
console.log('convert ceents in to dollers');
if (currencyfunc(2095)=== '20.95') {
    console.log('passed');

}else{
    console.log('failed');
}

console.log('work with zeros');
if (currencyfunc(0) === '0.00') {
    console.log('passed');
}else{
    console.log('failed');
}

console.log('rounding with nearest cents');
if (currencyfunc(2000.5) === '20.01') {
    console.log('passed');
}else{
    console.log('failed');
}