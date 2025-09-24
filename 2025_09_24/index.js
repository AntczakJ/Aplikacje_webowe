const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {


    switch (req.url) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
            res.end('Strona główna\n');
            break;
        case '/1':
            res.writeHead(200, {'Content-Type': 'application.json'});
            const obj = {
                name: "John",
                age: 30,
                city: "New York"};
            const myJSON = JSON.stringify(obj);
            res.end(myJSON);
            break;
        case '/2':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('<h1 style="color: orangered">Hello world!</h1>');
            break;
        case '/3':
            res.writeHead(200,{'Content-Type': 'text/html'});
            try {
                const data = fs.readFileSync('index.html', 'utf8');
                console.log('File content:', data);
                res.end(data);
            } catch (err) {
                console.error('Error reading file:', err);
            }
            break;
        default:
            res.statusCode = 404;
            res.end('Not Found!');
            break;
    }
});


server.listen(3000 ,()=>{
    console.log('Server started on port 3000')
});