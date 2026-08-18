import http from 'http';

const server = http.createServer();
server.on('request', (req, res) => {
  res.write("<h1 style='color: red;>Welcome to the HTTP server!");
  res.write("<h2>Nodemon is tracking this site ")
  res.end();
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });