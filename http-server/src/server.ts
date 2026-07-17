import * as http from 'node:http';

// Define the port the server will listen on
const PORT = 3000;

// Create the HTTP server instance
const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {

  // Restrict to specific path and method
  if (req.url === '/headers' && req.method === 'GET') {
     // Set the response HTTP status and headers
  res.writeHead(200, { 'Content-Type': 'application/json' });

  // Create a JSON payload response
  const responseData = {
    message: "Hello! Here's your headers.",
    headers: req.headers,
    path: req.url,
    timestamp: new Date().toISOString()
  };

  // Send the response body and close the connection
  res.end(JSON.stringify(responseData));
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
 
});

// Start listening for incoming connections
server.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
