// This will be our application entry. We'll setup our server here.
import { createServer } from 'http';
import app from '../app'; // The express app we just created

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

console.log('Server listening on port ' + port);

const server = createServer(app);
server.listen(port);
