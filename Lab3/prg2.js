import http from 'http';

const server = http.createServer();
server.on('request', (req, res) => {
    // res.writeHead(404,{
    //     'Content-Type': 'text/html'
    // });
    res.end("<h1 style='color: red;'>Welcome to the HTTP server!</h1>");
});

const PORT = 5555;

server.listen(PORT, () => {
    console.log('Server is running on http://localhost:5555');
});