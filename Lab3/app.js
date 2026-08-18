import http from 'http';

const server = http.createServer();
server.on('request', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write("<h1 style='color: red;'>Welcome to the HTTP server!</h1>");
  res.write("<h2 style='color: blue;'>Nodemon is tracking this site</h2>");
  res.end();
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});