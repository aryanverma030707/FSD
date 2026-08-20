import http from 'http';

const server = http.createServer();
server.on('request', (req, res) => {
    
    if(req.url === '/'){
        res.end('<h1>Mobile Phone</h1><h2>Price: 1000</h2><p>Brand: Samsung</p>')
    }
    else if(req.url === '/about'){
        res.end('<h1>About Us</h1><p>We are a company that sells mobile phones.</p>')
    }
    else if(req.url === '/contact'){
        res.end('<h1>Contact Us</h1><p>Email: info@company.com</p>')
    }
    else{
        res.end('<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>')
    }
});
 
const PORT = 4444;
server.listen(PORT, () => {
    console.log('Server is running on http://localhost:4444');
});