const { URL } = require('url');
const adr = 'http://localhost:8080/default.htm?year=2017&month=february';
const q = new URL(adr);

console.log(q.host);
console.log(q.pathname);
console.log(q.search);
console.log(q.searchParams.get('month'));
