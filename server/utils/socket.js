import jwt from 'jsonwebtoken';
import Message from '../models/Message.js';


export const registerSocketHandlers = (io) => {
io.use((socket, next) => {
try {
const token = socket.handshake.auth?.token;
if (!token) return next(); // allow anon if you want; or: return next(new Error('Auth required'))
const decoded = jwt.verify(token, process.env.JWT_SECRET);
socket.user = { id: decoded.id };
next();
} catch (e) {
next();
}
});


io.on('connection', (socket) => {
const userId = socket.user?.id;
if (userId) socket.join(userId); // personal room


socket.on('message:send', async ({ to, text }) => {
if (!userId) return; // ignore unauthenticated
const msg = await Message.create({ sender: userId, receiver: to, text });
io.to(to).emit('message:receive', { _id: msg._id, sender: userId, receiver: to, text, createdAt: msg.createdAt });
socket.emit('message:deliver', { _id: msg._id });
});


socket.on('disconnect', () => {});
});
};