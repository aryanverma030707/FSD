import http from 'http';

const server = http.createServer();
server.on('request', (req, res) => {
    console.log('"Welcome to Node.js"');   
    console.log(req.url);
    console.log(req.method);
    
    res.end("hello world");
});

const PORT = 4444;

server.listen(PORT, () => {
    console.log('Server is running on http://localhost:4444');
});