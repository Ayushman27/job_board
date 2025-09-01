// //Entry points

// import http from 'http';
// import { Server as SocketIOServer } from 'socket.io';
// import app from './app.js';
// import { connectDB } from './config/db.js';
// import { registerSocketHandlers } from './utils/socket.js';
// import dotenv from 'dotenv';


// dotenv.config();
// const PORT = process.env.PORT || 5000;


// await connectDB();


// const server = http.createServer(app);
// const io = new SocketIOServer(server, {
// cors: { origin: process.env.CLIENT_URL || '*', credentials: true }
// });


// registerSocketHandlers(io);


// server.listen(PORT, () => {
// console.log(`API running on http://localhost:${PORT}`);
// });

// server/server.js
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;

await connectDB();

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: process.env.CLIENT_URL || '*', credentials: true }
});

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
